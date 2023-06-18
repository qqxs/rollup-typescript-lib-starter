export interface LoggerOptions {
  level: 'DEBUG' | 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR';
}

/**
 * @class Logger class
 * @classdesc Provide multiple log printing methods
 */
class Logger {
  static TAG = 'LOGGER';

  // log level default 0,
  static LOGGER_LEVEL: number = 0;

  /**
   * @description Static method used to print error logs
   *
   * @example
   * Logger.e("error message") // [LOGGER ERROR] > error message
   * Logger.e("error message", "ERROR") // [ERROR] > error message
   *
   * @param {any} msg error message
   * @param {string} tag logger prefix tag
   * @returns {void}
   */
  static e(msg: any, tag?: string) {
    if (this.LOGGER_LEVEL <= 4) console.error(`[${tag || `${Logger.TAG} ERROR`}] > `, msg);
  }

  /**
   * @description Static method used to print warn logs
   *
   * @example
   * Logger.w("warn message") // [LOGGER WARN] > warn message
   * Logger.w("warn message", "WARN") // [WARN] > warn message
   *
   * @param {any} msg warn message
   * @param {string} tag logger tage
   * @returns {void}
   */
  static w(msg: any, tag?: string) {
    if (this.LOGGER_LEVEL <= 3) console.warn(`[${tag || `${Logger.TAG} WARN`}] > `, msg);
  }

  /**
   * @description Static method used to print info logs
   *
   * @example
   * Logger.i("info message") // [LOGGER INFO] > info message
   * Logger.i("info message", "ERROR") // [LOGGER INFO] > info message
   *
   * @param {any} msg info message
   * @param {string} tag logger prefix tag
   * @returns {void}
   */
  static i(msg: any, tag?: string) {
    if (this.LOGGER_LEVEL <= 2) console.info(`[${tag || `${Logger.TAG} INFO`}] > `, msg);
  }

  /**
   * @description Static method used to print verbose logs
   *
   * @example
   * Logger.v("verbose message") // [LOGGER VERBOSE] > verbose message
   * Logger.v("verbose message", "VERBOSE") // [VERBOSE] > verbose message
   *
   * @param {any} msg verbose message
   * @param {string} tag logger tag
   * @returns {void}
   */
  static v(msg: any, tag?: string) {
    if (this.LOGGER_LEVEL <= 1) console.log(`[${tag || `${Logger.TAG} VERBOSE`}] > `, msg);
  }

  /**
   * @description Static method used to print debug logs
   *
   * @example
   * Logger.d("debug message") // [LOGGER DEBUG] > debug message
   * Logger.d("debug message", "DEBUG") // [DEBUG] > debug message
   *
   * @param {any} msg debug message
   * @param {string} tag logger tag
   * @returns {void}
   */
  static d(msg: any, tag?: string) {
    if (this.LOGGER_LEVEL < 1) console.debug(`[${tag || `${Logger.TAG} DEBUG`}] > `, msg);
  }

  static setOptions(options: LoggerOptions) {
    this.LOGGER_LEVEL = this._matchLevel(options.level);
  }

  private static _matchLevel(level: string) {
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
