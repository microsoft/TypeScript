//// [tests/cases/compiler/unusedPrivateVariableInClass4.ts] ////

//// [unusedPrivateVariableInClass4.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    public method1() {
        this.x;
    }
}

//// [unusedPrivateVariableInClass4.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.method1 = function () {
        this.x;
    };
    return greeter;
}());
