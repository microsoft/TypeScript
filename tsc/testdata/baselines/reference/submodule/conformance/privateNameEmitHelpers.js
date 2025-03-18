//// [tests/cases/conformance/classes/members/privateNames/privateNameEmitHelpers.ts] ////

//// [main.ts]
export class C {
    #a = 1;
    #b() { this.#c = 42; }
    set #c(v: number) { this.#a += v; }
}

//// [tslib.d.ts]
// these are pre-TS4.3 versions of emit helpers, which only supported private instance fields
export declare function __classPrivateFieldGet<T extends object, V>(receiver: T, state: any): V;
export declare function __classPrivateFieldSet<T extends object, V>(receiver: T, state: any, value: V): V;


//// [main.js]
export class C {
    #a = 1;
    #b() { this.#c = 42; }
    set #c(v) { this.#a += v; }
}
