export interface EventEmitterInter {
  on(type: string, fn: Function): void
  off(type: string): void
  emit(type: string): void
  once(type: string, fn: Function): void
}

class EventEmitter implements EventEmitterInter {
  private listen: Record<string, Array<Function>>

  constructor() {
    this.listen = {}
  }

  /**
   * @param type
   * @param fn
   */
  on(type: string, fn: Function): void {
    if (this.listen[type]) {
      this.listen[type].push(fn)
    } else {
      this.listen[type] = [fn]
    }
  }

  /**
   * @param type
   */
  off(type: string): void {
    this.listen[type] = []
  }

  /**
   * @param type
   */
  emit(type: string): void {
    if (this.listen[type]) {
      this.listen[type].forEach(f => f())
    }
  }

  /**
   * @param type
   * @param fn
   */
  once(type: string, fn: Function): void {
    const cb = () => {
      fn()
      this.off(type)
    }
    this.on(type, cb)
  }
}

export default EventEmitter
