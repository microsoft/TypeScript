//// [unusedPrivateVariableInClass1.ts]
class greeter {
    private x: string;
}

//// [unusedPrivateVariableInClass1.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    return greeter;
}());
