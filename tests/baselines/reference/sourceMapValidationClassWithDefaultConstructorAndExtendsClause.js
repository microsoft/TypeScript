//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.ts]
class AbstractGreeter {
}

class Greeter extends AbstractGreeter {
    public a = 10;
    public nameA = "Ten";
}

//// [sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractGreeter = (function () {
    function AbstractGreeter() {
    }
    return AbstractGreeter;
})();

var Greeter = (function (_super) {
    __extends(Greeter, _super);
    function Greeter() {
        _super.apply(this, arguments);
        this.a = 10;
        this.nameA = "Ten";
    }
    return Greeter;
})(AbstractGreeter);
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndExtendsClause.js.map
