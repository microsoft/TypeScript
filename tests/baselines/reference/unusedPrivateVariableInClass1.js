//// [unusedPrivateVariableInClass1.ts]
class greeter {
    private x: string;
}

//// [unusedPrivateVariableInClass1.js]
var greeter = (function () {
    function greeter() {
    }
    return greeter;
}());
