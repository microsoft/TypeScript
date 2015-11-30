//// [systemModule6.ts]

export class C {}
function foo() {
    new C();
}


//// [systemModule6.js]
System.register([], function(exports_1) {
    "use strict";
    var C;
    function foo() {
        new C();
    }
    return {
        setters:[],
        execute: function() {
            C = (function () {
                function C() {
                }
                return C;
            })();
            exports_1("C", C);
        }
    }
});
