//// [tests/cases/compiler/es5-umd3.ts] ////

//// [es5-umd3.ts]
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


//// [es5-umd3.js]
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
