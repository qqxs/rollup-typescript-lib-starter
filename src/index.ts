import Logger from './utils/logger';

export interface EventEmitterInter {
  on: (type: string, fn: () => any) => void;
  off: (type: string) => void;
  emit: (type: string) => void;
  once: (type: string, fn: () => any) => void;
}

/**
 * @class
 * @classdesc 发布订阅
 */
class EventEmitter implements EventEmitterInter {
  private listen: Record<string, Array<() => any>>;

  constructor() {
    this.listen = {};
  }

  /**
   * @description 添加订阅
   * @param {string} type 订阅类型
   * @param {Function} fn 订阅回调函数
   * @returns {void}
   */
  on(type: string, fn: () => any): void {
    if (this.listen[type]) {
      this.listen[type].push(fn);
    } else {
      this.listen[type] = [fn];
    }
    Logger.v(fn);
    console.log('this is console.log');
    debugger;
  }

  /**
   * @description 取消订阅
   * @param {string} type 取消订阅的类型
   * @returns {void}
   */
  off(type: string): void {
    this.listen[type] = [];
  }

  /**
   * @description 触发订阅
   * @param {string} type 订阅类型
   * @return {void}
   */
  emit(type: string): void {
    if (this.listen[type]) {
      this.listen[type].forEach((f) => f());
    }
  }

  /**
   * @description 订阅一次, 只触发一次， 然后销毁
   * @param {string} type 订阅类型
   * @param {Function} fn 订阅回调函数
   * @returns {void}
   */
  once(type: string, fn: () => any): void {
    const cb = () => {
      fn();
      this.off(type);
    };
    this.on(type, cb);
  }
}

export default EventEmitter;
