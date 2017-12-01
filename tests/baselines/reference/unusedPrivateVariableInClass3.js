//// [unusedPrivateVariableInClass3.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;
}

//// [unusedPrivateVariableInClass3.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    return greeter;
}());
