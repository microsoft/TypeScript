//// [tests/cases/compiler/es5-umd2.ts] ////

//// [es5-umd2.ts]
export class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}


//// [es5-umd2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
exports.A = A;
