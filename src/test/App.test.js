import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import React from 'react';

beforeEach(() => {
    render(<App />);
});
describe("Does page render correctly", () => {
  test('All buttons in calculator correctly rendered', () => {
    const buttons = screen.getAllByRole('button', { hidden: true });
    expect(buttons.length).toEqual(23);
  });
  test('Testing for PEMDAS calculation', () => {
    const keys = [4, '+', 5, '*', 2, '=']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button'}));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("14");
  });
  test('Testing for decimals calculation', () => {
    const keys = [4, '.', 5, '*', 2, '=']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button'}));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("9");
  });
  test('Are nums stored in memory', () => {
    const keys = [9, '*', 9, 'MS', 0, 'MR', '=']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button'}));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("81");
  });
  test('Is Exponential-Squareroot calculated first', () => {
    const keys = [5, '*', 2, '+', '√', 9, '=']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button'}));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("13");
  });
  test('Does backspace button last entered digit', () => {
    const keys = [5, 9, 0, '⌫']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button' }));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("59");
  });
  test('Does MC clear screen', () => {
    const keys = [9, '+', 9, 'MC', 5, '-', 2, '=']
    keys.forEach(
      key => {
        userEvent.click(screen.getByText(key, { selector: 'button' }));
      });
    expect(screen.getByTestId('screen-id').textContent).toEqual("3");
  });
  test('Does percentage sign return a percent of number', () => {
    const keys = [9, '/', 1, 0, '=', '%']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button' }));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("0.009000000000000001");
  });
  test('Does exponential - exponent return the correct output', () => {
    const keys = [9, '+', 3, 0, 0, '-', 5, '^', 3, '='] 
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button' }));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("184");
  });
  test('If subtract a greater num from a smaller num is result negative', () => {
    const keys = [9, '-', 1, 2, '=']
    keys.forEach( key => {
      userEvent.click(screen.getByText(key, { selector: 'button'}));
    });
    expect(screen.getByTestId('screen-id').textContent).toEqual("-3");
  });
});
