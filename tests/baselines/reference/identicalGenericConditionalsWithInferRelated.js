//// [tests/cases/compiler/identicalGenericConditionalsWithInferRelated.ts] ////

//// [identicalGenericConditionalsWithInferRelated.ts]
function f<X>(arg: X) {
    type Cond1 = X extends [infer A] ? A : never;
    type Cond2 = X extends [infer A] ? A : never;

    let x: Cond1 = null as any;
    let y: Cond2 = null as any;
    x = y; // is err, should be ok
    y = x; // is err, should be ok
}

// repro from https://github.com/microsoft/TypeScript/issues/26627
export type Constructor<T> = new (...args: any[]) => T
export type MappedResult<T> =
    T extends Boolean ? boolean :
    T extends Number ? number :
    T extends String ? string :
    T


interface X {
    decode<C extends Constructor<any>>(ctor: C): MappedResult<C extends Constructor<infer T> ? T : never>
}

class Y implements X {
    decode<C extends Constructor<any>>(ctor: C): MappedResult<C extends Constructor<infer T> ? T : never> {
        throw new Error()
    }
}


//// [identicalGenericConditionalsWithInferRelated.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f(arg) {
    let x = null;
    let y = null;
    x = y; // is err, should be ok
    y = x; // is err, should be ok
}
class Y {
    decode(ctor) {
        throw new Error();
    }
}
