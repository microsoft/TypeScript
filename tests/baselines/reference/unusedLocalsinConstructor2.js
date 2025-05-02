//// [tests/cases/compiler/unusedLocalsinConstructor2.ts] ////

//// [unusedLocalsinConstructor2.ts]
class greeter {
    constructor() {
        var unused = 20;
        var used = "dummy";
        used = used + "second part";
    }
}

//// [unusedLocalsinConstructor2.js]
var greeter = /** @class */ (function () {
    function greeter() {
        var unused = 20;
        var used = "dummy";
        used = used + "second part";
    }
    return greeter;
}());
