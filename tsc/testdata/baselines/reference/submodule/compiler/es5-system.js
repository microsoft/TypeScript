//// [tests/cases/compiler/es5-system.ts] ////

//// [es5-system.ts]
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


//// [es5-system.js]
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
