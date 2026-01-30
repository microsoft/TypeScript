//// [tests/cases/compiler/es5-commonjs.ts] ////

//// [es5-commonjs.ts]
export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}


//// [es5-commonjs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
exports.default = A;
