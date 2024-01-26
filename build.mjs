/* eslint-disable import/no-extraneous-dependencies */
import { ExecError, connect } from "@dagger.io/dagger";
import { writeFile } from "fs/promises";

connect(
  async (client) => {
    const source = client.host().directory(".", { exclude: ["node_modules/"] });
    const node = client.container().from("node:16");
    const runner = node
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec(["npm", "install"]);
    let lintErrors = null;
    try {
      await runner.withExec(["npm", "run", "lint"]).sync();
    } catch (error) {
      if (error instanceof ExecError) {
        console.log("Linting errors found");
        lintErrors = error.stdout;
        await writeFile("./lint-report.txt", error.stdout);
      }
    }
    if (lintErrors) {
      console.log("Proceeding with the build despite lint errors.");
    }
    await runner.withExec(["npm", "run", "format"]).sync();
    try {
      await runner.withExec(["npm", "audit", "--json"])
        .sync();
    } catch (error) {
      if (error instanceof ExecError) {
        if (error.exitCode === 1) {
          const errorRes = JSON.parse(error.stdout).metadata;
          const highThreshold = errorRes.vulnerabilities.high;
          const criticalThreshold = errorRes.vulnerabilities.critical;
          if (highThreshold > 2 || criticalThreshold > 0) {
            const vulnerabilities = `High: ${highThreshold}, Critical: ${criticalThreshold}`;
            await runner.withExec(["node", "sendEmail.mjs", vulnerabilities]).sync();
          }
        }
      } else {
        // throw error;
      }
    }

    await runner.withExec(["npm", "test", "--", "--watchAll=false"]).sync();
    await runner
      .withExec(["npm", "install"])
      .withExec(["npm", "run", "build"])
      .directory("build/")
      .export("./build");
  },
  { LogOutput: process.stderr },
);
