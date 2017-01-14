//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.ts]
class AbstractGreeter {
}

class Greeter extends AbstractGreeter {
    public a = 10;
    public nameA = "Ten";
}

//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractGreeter = (function () {
    function AbstractGreeter() {
    }
    return AbstractGreeter;
}());
var Greeter = (function (_super) {
    __extends(Greeter, _super);
    function Greeter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a = 10;
        _this.nameA = "Ten";
        return _this;
    }
    return Greeter;
}(AbstractGreeter));
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js.map