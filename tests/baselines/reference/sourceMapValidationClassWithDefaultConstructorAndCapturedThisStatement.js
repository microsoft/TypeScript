//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts]
class Greeter {
    public a = 10;
    public returnA = () => this.a;
}

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js]
var Greeter = /** @class */ (function () {
    function Greeter() {
        var _this = this;
        this.a = 10;
        this.returnA = function () { return _this.a; };
    }
    return Greeter;
}());
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js.map