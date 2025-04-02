//// [tests/cases/compiler/unusedParametersinConstructor3.ts] ////

//// [unusedParametersinConstructor3.ts]
class greeter {
    constructor(param1: string, param2: string, param3: string) {
        param2 = param2 + "dummy value";
    }
}

//// [unusedParametersinConstructor3.js]
var greeter = /** @class */ (function () {
    function greeter(param1, param2, param3) {
        param2 = param2 + "dummy value";
    }
    return greeter;
}());
