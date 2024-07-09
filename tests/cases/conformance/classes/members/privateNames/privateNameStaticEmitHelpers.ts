// @target: es2015
// @importHelpers: true
// @isolatedModules: true

// @filename: main.ts

export class S {
    static #a = 1;
    static #b() { this.#a = 42; }
    static get #c() { return S.#b(); }
}

// @filename: tslib.d.ts
// these are pre-TS4.3 versions of emit helpers, which only supported private instance fields
export declare function __classPrivateFieldGet<T extends object, V>(receiver: T, state: any): V;
export declare function __classPrivateFieldSet<T extends object, V>(receiver: T, state: any, value: V): V;
