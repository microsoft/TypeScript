//// [unusedPrivateVariableInClass3.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;
}

//// [unusedPrivateVariableInClass3.js]
var greeter = (function () {
    function greeter() {
    }
    return greeter;
}());
