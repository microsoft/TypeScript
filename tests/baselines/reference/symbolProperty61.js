//// [tests/cases/conformance/es6/Symbols/symbolProperty61.ts] ////

//// [symbolProperty61.ts]
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


//// [symbolProperty61.js]
const observable = Symbol.obs;
export class MyObservable {
    constructor(_val) {
        this._val = _val;
    }
    subscribe(next) {
        next(this._val);
    }
    [observable]() {
        return this;
    }
}
function from(obs) {
    return obs[Symbol.obs]();
}
from(new MyObservable(42));


//// [symbolProperty61.d.ts]
declare global {
    interface SymbolConstructor {
        readonly obs: symbol;
    }
}
declare const observable: typeof Symbol.obs;
export declare class MyObservable<T> {
    private _val;
    constructor(_val: T);
    subscribe(next: (val: T) => void): void;
    [observable](): this;
}
export {};
