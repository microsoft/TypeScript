//// [unusedPrivateVariableInClass5.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    constructor() {
        this.x = "dummy value";
    }
}

//// [unusedPrivateVariableInClass5.js]
var greeter = (function () {
    function greeter() {
        this.x = "dummy value";
    }
    return greeter;
}());
