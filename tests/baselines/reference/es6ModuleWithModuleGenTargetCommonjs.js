//// [tests/cases/compiler/es6ModuleWithModuleGenTargetCommonjs.ts] ////

//// [es6ModuleWithModuleGenTargetCommonjs.ts]
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

//// [es6ModuleWithModuleGenTargetCommonjs.js]
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
