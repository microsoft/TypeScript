//// [es6ModuleWithModuleGenTargetAmd.ts]
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

//// [es6ModuleWithModuleGenTargetAmd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class A {
        constructor() {
        }
        B() {
            return 42;
        }
    }
    exports.A = A;
});
