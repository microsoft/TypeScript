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
System.register([], function (exports_1, context_1) {
    "use strict";
    var A;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            A = /** @class */ (function () {
                function A() {
                }
                A.prototype.B = function () {
                    return 42;
                };
                return A;
            }());
            exports_1("default", A);
        }
    };
});
