//// [systemModule6.ts]
export class C {}
function foo() {
    new C();
}


//// [systemModule6.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C;
    var __moduleName = context_1 && context_1.id;
    function foo() {
        new C();
    }
    return {
        setters: [],
        execute: function () {
            C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports_1("C", C);
        }
    };
});
