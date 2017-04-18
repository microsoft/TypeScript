//// [unusedPrivateVariableInClass2.ts]
class greeter {
    private x: string;
    private y: string;
}

//// [unusedPrivateVariableInClass2.js]
var greeter = (function () {
    function greeter() {
    }
    return greeter;
}());
