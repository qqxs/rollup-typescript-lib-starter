/**
 * @class Logger class
 * @classdesc Provide multiple log printing methods
 */
class Logger {
  static TAG = 'LOGGER';

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
    console.error(`[${tag || `${Logger.TAG} ERROR`}] > `, msg);
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
    console.info(`[${tag || `${Logger.TAG} INFO`}] > `, msg);
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
    console.warn(`[${tag || `${Logger.TAG} WARN`}] > `, msg);
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
    console.debug(`[${tag || `${Logger.TAG} DEBUG`}] > `, msg);
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
    console.log(`[${tag || `${Logger.TAG} VERBOSE`}] > `, msg);
  }
}

export default Logger;