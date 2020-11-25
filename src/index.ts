class Person {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
    // _concat([1], 2, [3], [[4]])
  }

  //   async getPromise(): Promise<any> {
  //     const num = await new Promise((resolve: (value?: unknown) => void) => {
  //       resolve(1)
  //     })

  //     return num
  //   }
}

export default Person

// import { fromEvent } from 'rxjs'

// fromEvent(document, 'click').subscribe(e => console.log(e))
