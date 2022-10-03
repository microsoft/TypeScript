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
exports.__esModule = true;
function f(arg) {
    var x = null;
    var y = null;
    x = y; // is err, should be ok
    y = x; // is err, should be ok
}
var Y = /** @class */ (function () {
    function Y() {
    }
    Y.prototype.decode = function (ctor) {
        throw new Error();
    };
    return Y;
}());
