import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const setTimeOutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(setTimeOutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeOutSpy).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 2000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, interval);
    jest.runOnlyPendingTimers();
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();
    const numberOfCalls = 5;

    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(interval * numberOfCalls);
    expect(callback).toBeCalledTimes(numberOfCalls);
  });
});

describe('readFileAsynchronously', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const joinSpy = jest.spyOn(path, 'join').mockReturnValue('pathToFile');

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('test');
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'test');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('test');
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'hello world';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    (<jest.Mock>readFile).mockResolvedValue(fileContent);
    const result = await readFileAsynchronously('test');
    expect(result).toBe(fileContent);
  });
});
