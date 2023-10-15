export type EventCallbackFn = () => any;

export interface EventEmitterInter {
  on: (type: string, fn: EventCallbackFn) => void;
  off: (type: string, fn?: EventCallbackFn) => void;
  emit: (type: string) => void;
  once: (type: string, fn: EventCallbackFn) => void;
}

/**
 * @class EventEmitter
 * @classdesc 发布订阅
 */
class EventEmitter implements EventEmitterInter {
  private listen: Record<string, EventCallbackFn[]>;

  constructor() {
    this.listen = {};
  }

  /**
   * @description 添加订阅
   * @param {string} type 订阅类型
   * @param {Function} fn 订阅回调函数
   * @returns {void}
   */
  on(type: string, fn: EventCallbackFn): void {
    if (this.listen[type]) {
      this.listen[type].push(fn);
    } else {
      this.listen[type] = [fn];
    }
    console.log('this is console.log');
  }

  /**
   * @description 取消订阅
   * @param {string} type 取消订阅的类型
   * @returns {void}
   */
  off(type: string, fn?: EventCallbackFn): void {
    if (typeof fn === 'function') {
      const list = this.listen[type];
      const index = list.findIndex((item) => item === fn);
      list.splice(index, 1);
      this.listen[type] = list;
    } else {
      this.listen[type] = [];
    }
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
  once(type: string, fn: EventCallbackFn): void {
    const cb = () => {
      fn();
      this.off(type, cb);
    };
    this.on(type, cb);
  }

  version() {
    return '__VERSION__';
  }
}

export default EventEmitter;
