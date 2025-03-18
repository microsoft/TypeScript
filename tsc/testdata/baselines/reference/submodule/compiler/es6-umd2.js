//// [tests/cases/compiler/es6-umd2.ts] ////

//// [es6-umd2.ts]
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

//// [es6-umd2.js]
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
