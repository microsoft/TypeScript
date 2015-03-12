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
    var A = (function () {
        function A() {
        }
        A.prototype.B = function () {
            return 42;
        };
        return A;
    })();
    exports.A = A;
});
