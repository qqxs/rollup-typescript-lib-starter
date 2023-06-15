import Logger from '../src/utils/logger';

/**
 * Dummy test
 */
describe('Logger test', () => {
  it('Logger verbose', () => {
    const originalLog = global.console.log;
    global.console.log = jest.fn();

    Logger.v('verbose message');
    expect(global.console.log).toHaveBeenCalledWith('[LOGGER VERBOSE] > ', 'verbose message');

    Logger.v('verbose message', 'VERBOSE');
    expect(global.console.log).toHaveBeenCalledWith('[VERBOSE] > ', 'verbose message');

    // 恢复原 console 函数引用
    global.console.log = originalLog;
  });

  it('Logger warn', () => {
    const originalWarn = global.console.warn;
    global.console.warn = jest.fn();

    Logger.w('warn message');
    expect(global.console.warn).toHaveBeenCalledWith('[LOGGER WARN] > ', 'warn message');

    Logger.w('warn message', 'WARN');
    expect(global.console.warn).toHaveBeenCalledWith('[WARN] > ', 'warn message');

    // 恢复原 console 函数引用
    global.console.warn = originalWarn;
  });

  it('Logger error', () => {
    const originalError = global.console.error;
    global.console.error = jest.fn();

    Logger.e('error message');
    expect(global.console.error).toHaveBeenCalledWith('[LOGGER ERROR] > ', 'error message');

    Logger.e('error message', 'ERROR');
    expect(global.console.error).toHaveBeenCalledWith('[ERROR] > ', 'error message');

    // 恢复原 console 函数引用
    global.console.error = originalError;
  });

  it('Logger debug', () => {
    const originalDebug = global.console.debug;
    global.console.debug = jest.fn();

    Logger.d('debug message');
    expect(global.console.debug).toHaveBeenCalledWith('[LOGGER DEBUG] > ', 'debug message');

    Logger.d('debug message', 'DEBUG');
    expect(global.console.debug).toHaveBeenCalledWith('[DEBUG] > ', 'debug message');

    // 恢复原 console 函数引用
    global.console.debug = originalDebug;
  });

  it('Logger info', () => {
    const originalInfo = global.console.info;
    global.console.info = jest.fn();

    Logger.i('info message');
    expect(global.console.info).toHaveBeenCalledWith('[LOGGER INFO] > ', 'info message');

    Logger.i('info message', 'INFO');
    expect(global.console.info).toHaveBeenCalledWith('[INFO] > ', 'info message');

    // 恢复原 console 函数引用
    global.console.info = originalInfo;
  });
});
