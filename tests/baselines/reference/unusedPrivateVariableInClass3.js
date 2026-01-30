//// [tests/cases/compiler/unusedPrivateVariableInClass3.ts] ////

//// [unusedPrivateVariableInClass3.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;
}

//// [unusedPrivateVariableInClass3.js]
"use strict";
var greeter = /** @class */ (function () {
    function greeter() {
    }
    return greeter;
}());
