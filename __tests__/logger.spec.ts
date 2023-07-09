import Logger from '../src/utils/logger';

const VERBOSE = ['LOGGER VERBOSE', 'verbose message'];
const WARN = ['LOGGER WARN', 'warn message'];
const ERROR = ['LOGGER ERROR', 'error message'];
const DEBUG = ['LOGGER DEBUG', 'debug message'];
const INFO = ['LOGGER INFO', 'info message'];

/**
 * Logger default test
 */
describe('Logger test', () => {
  /**
   * Logger default test
   */
  describe('Logger test', () => {
    it('Logger verbose', () => {
      testFn('log', VERBOSE);
    });

    it('Logger warn', () => {
      testFn('warn', WARN);
    });

    it('Logger error', () => {
      testFn('error', ERROR);
    });

    it('Logger debug', () => {
      testFn('debug', DEBUG);
    });

    it('Logger info', () => {
      testFn('info', INFO);
    });
  });

  /**
   * Logger test set level options
   */
  describe('Logger test', () => {
    it('Logger set options', () => {
      Logger.setOptions({
        level: 'INFO',
      });
    });

    it('Logger warn', () => {
      testFn('warn', WARN);
    });

    it('Logger error', () => {
      testFn('error', ERROR);
    });

    // it('Logger debug', () => {
    //   testFn('debug', DEBUG);
    // });

    it('Logger info', () => {
      testFn('info', INFO);
    });

    it('Logger set options', () => {
      Logger.setOptions({
        level: 'DEBUG',
      });
    });
  });

  /**
   * Logger test set hide tag options
   */
  describe('Logger test', () => {
    it('Logger verbose', () => {
      testHideTagFn('log', VERBOSE);
    });

    it('Logger warn', () => {
      testHideTagFn('warn', WARN);
    });

    it('Logger error', () => {
      testHideTagFn('error', ERROR);
    });

    it('Logger debug', () => {
      testHideTagFn('debug', DEBUG);
    });

    it('Logger info', () => {
      testHideTagFn('info', INFO);
    });
  });
});

/**
 *
 * @param type console type
 * @param arrStr string array
 */
function testFn(type: string, arrStr: string[]) {
  const original = (global.console as any)[type];
  (global.console as any)[type] = jest.fn();

  const loggerLevel = switchLoggerType(type);
  if (loggerLevel === '') return;
  (Logger as any)[loggerLevel](arrStr[1]);
  expect((global.console as any)[type]).toHaveBeenCalledWith(`[${arrStr[0]}] > `, arrStr[1]);

  // 恢复原 console 函数引用
  (global.console as any)[type] = original;
}

/**
 *
 * @param type console type
 * @param arrStr string array
 */
function testHideTagFn(type: string, arrStr: string[]) {
  Logger.setOptions({
    hideTag: true,
  });

  const original = (global.console as any)[type];
  (global.console as any)[type] = jest.fn();

  const loggerLevel = switchLoggerType(type);
  if (loggerLevel === '') return;
  (Logger as any)[loggerLevel](arrStr[1]);
  expect((global.console as any)[type]).toHaveBeenCalledWith(arrStr[1]);

  // 恢复原 console 函数引用
  (global.console as any)[type] = original;
  Logger.setOptions({
    hideTag: false,
  });
}

function switchLoggerType(type: string) {
  switch (type) {
    case 'log':
      return 'v';
    case 'info':
      return 'i';
    case 'warn':
      return 'w';
    case 'debug':
      return 'd';
    case 'error':
      return 'e';
  }
  return '';
}
