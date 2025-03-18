//// [tests/cases/compiler/es5-commonjs4.ts] ////

//// [es5-commonjs4.ts]
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
export var __esModule = 1;


//// [es5-commonjs4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__esModule = void 0;
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
exports.default = A;
exports.__esModule = 1;
