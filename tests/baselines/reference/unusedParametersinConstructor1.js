//// [tests/cases/compiler/unusedParametersinConstructor1.ts] ////

//// [unusedParametersinConstructor1.ts]
class greeter {
    constructor(param1: string) {
    }
}

//// [unusedParametersinConstructor1.js]
"use strict";
var greeter = /** @class */ (function () {
    function greeter(param1) {
    }
    return greeter;
}());
