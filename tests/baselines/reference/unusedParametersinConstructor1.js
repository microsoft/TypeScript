//// [unusedParametersinConstructor1.ts]
class greeter {
    constructor(param1: string) {
    }
}

//// [unusedParametersinConstructor1.js]
var greeter = (function () {
    function greeter(param1) {
    }
    return greeter;
}());
