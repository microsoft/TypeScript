//// [tests/cases/compiler/unusedPrivateVariableInClass2.ts] ////

//// [unusedPrivateVariableInClass2.ts]
class greeter {
    private x: string;
    private y: string;
}

//// [unusedPrivateVariableInClass2.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    return greeter;
}());
