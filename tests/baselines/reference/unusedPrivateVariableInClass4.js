//// [unusedPrivateVariableInClass4.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    public method1() {
        this.x = "dummy value";
    }
}

//// [unusedPrivateVariableInClass4.js]
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.method1 = function () {
        this.x = "dummy value";
    };
    return greeter;
}());
