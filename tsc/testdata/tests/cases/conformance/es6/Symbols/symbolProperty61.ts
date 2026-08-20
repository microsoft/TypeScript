// @target: ES6
// @declaration: true

declare global {
  interface SymbolConstructor {
    readonly obs: symbol
  }
}

const observable: typeof Symbol.obs = Symbol.obs

export class MyObservable<T> {
    constructor(private _val: T) {}

    subscribe(next: (val: T) => void) {
        next(this._val)
    }

    [observable]() {
        return this
    }
}

type InteropObservable<T> = {
    [Symbol.obs]: () => { subscribe(next: (val: T) => void): void }
}

function from<T>(obs: InteropObservable<T>) {
    return obs[Symbol.obs]()
}

from(new MyObservable(42))
