//// [es5ModuleWithoutModuleGenTarget.ts]
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

//// [es5ModuleWithoutModuleGenTarget.js]
"use strict";
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
exports.A = A;
