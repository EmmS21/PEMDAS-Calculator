import { exec } from 'child_process';

exec('npm audit --json', (error, stdout, stderr) => {
    if (error) {
        console.log(`Audit Output: ${stdout}`);
        return;
    } if(stderr) {
        console.log(`Error in npm audit: ${stdout}`);
        return;
    }
    console.log(stdout);
});
