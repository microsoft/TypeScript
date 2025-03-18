//// [tests/cases/compiler/es5ModuleWithModuleGenAmd.ts] ////

//// [es5ModuleWithModuleGenAmd.ts]
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

//// [es5ModuleWithModuleGenAmd.js]
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
