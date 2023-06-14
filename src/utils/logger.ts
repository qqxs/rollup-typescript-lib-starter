// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Logger {
  static TAG = 'LOGGER';

  /**
   * @description logger print error message
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
   * @description logger print info message
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
   * @description logger print warn message
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
   * @description logger print debug message
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
   * @description logger print verbose message
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
