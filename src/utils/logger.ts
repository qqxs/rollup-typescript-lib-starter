/** logger level */
export type LoggerLevel = 'DEBUG' | 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR';

/** logger options */
export interface LoggerOptions {
  level?: LoggerLevel;
  hideTag?: boolean;
}

/**
 * @class Logger class
 * @classdesc Provide multiple log printing methods
 */
class Logger {
  private static readonly TAG = 'LOGGER';

  // log level default 0,
  private static LOGGER_LEVEL: number = 0;
  private static HIDE_TAG: boolean = false;

  /**
   * @description Static method used to print error logs
   * @static
   *
   * @example
   * Logger.e("error message") // [LOGGER ERROR] > error message
   *
   * @param {...any[]} args error messages
   * @returns {void}
   */
  static e(...args: any[]) {
    if (Logger.LOGGER_LEVEL <= 4)
      Logger.HIDE_TAG ? console.error(...args) : console.error(`[${Logger.TAG} ERROR] > `, ...args);
  }

  /**
   * @description Static method used to print warn logs
   * @static
   *
   * @example
   * Logger.w("warn message") // [LOGGER WARN] > warn message
   *
   * @param {...any[]} args warn messages
   * @returns {void}
   */
  static w(...args: any[]) {
    if (Logger.LOGGER_LEVEL <= 3)
      Logger.HIDE_TAG ? console.warn(...args) : console.warn(`[${Logger.TAG} WARN] > `, ...args);
  }

  /**
   * @description Static method used to print info logs
   * @static
   *
   * @example
   * Logger.i("info message") // [LOGGER INFO] > info message
   *
   * @param {...any[]} args info messages
   * @returns {void}
   */
  static i(...args: any[]) {
    if (Logger.LOGGER_LEVEL <= 2)
      Logger.HIDE_TAG ? console.info(...args) : console.info(`[${Logger.TAG} INFO] > `, ...args);
  }

  /**
   * @description Static method used to print verbose logs
   * @static
   *
   * @example
   * Logger.v("verbose message") // [LOGGER VERBOSE] > verbose message
   *
   * @param {...any[]} args verbose messages
   * @returns {void}
   */
  static v(...args: any[]) {
    if (Logger.LOGGER_LEVEL <= 1)
      Logger.HIDE_TAG ? console.log(...args) : console.log(`[${Logger.TAG} VERBOSE] > `, ...args);
  }

  /**
   * @description Static method used to print debug logs
   * @static
   *
   * @example
   * Logger.d("debug message") // [LOGGER DEBUG] > debug message
   * Logger.d("debug message", "DEBUG") // [DEBUG] > debug message
   *
   * @param {...any[]} msg debug messages
   * @returns {void}
   */
  static d(...args: any[]) {
    console.debug('debug', Logger.LOGGER_LEVEL < 1);
    if (Logger.LOGGER_LEVEL < 1)
      Logger.HIDE_TAG ? console.debug(...args) : console.debug(`[${Logger.TAG} DEBUG] > `, ...args);
  }

  /**
   * @description Static method used to set logger option
   * @static
   *
   * @example
   * Logger.setOptions({level: 'INFO'}) // set logger level
   *
   * @param {LoggerOptions} options logger options
   * @return {void}
   */
  static setOptions(options: LoggerOptions) {
    Logger.LOGGER_LEVEL = Logger._matchLevel(options.level);
    Logger.HIDE_TAG = !!options.hideTag;
  }

  /**
   * @description Static method used to match logger level
   * @static
   * @private
   *
   * @example
   * Logger._matchLevel("DEBUG") // 0
   *
   * @param {LoggerLevel} level logger level
   * @return {number}
   */
  private static _matchLevel(level?: LoggerLevel) {
    let logLevel = 0;
    switch (level) {
      case 'DEBUG':
        logLevel = 0;
        break;
      case 'VERBOSE':
        logLevel = 1;
        break;
      case 'INFO':
        logLevel = 2;
        break;
      case 'WARN':
        logLevel = 3;
        break;
      case 'ERROR':
        logLevel = 4;
        break;
    }

    return logLevel;
  }
}

export default Logger;
