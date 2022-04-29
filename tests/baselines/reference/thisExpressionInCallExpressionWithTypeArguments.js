//// [thisExpressionInCallExpressionWithTypeArguments.ts]
class C {
    public foo() { [1,2,3].map<any,any>((x) => { return this; })}
}


//// [thisExpressionInCallExpressionWithTypeArguments.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var _this = this;
        [1, 2, 3].map(function (x) { return _this; });
    };
    return C;
}());
