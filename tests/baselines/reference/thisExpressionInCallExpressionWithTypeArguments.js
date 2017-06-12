//// [thisExpressionInCallExpressionWithTypeArguments.ts]
class C {
    public foo() { [1,2,3].map<any,any>((x) => { return this; })}
}


//// [thisExpressionInCallExpressionWithTypeArguments.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        var _this = this;
        [1, 2, 3].map(function (x) { return _this; });
    };
    return C;
}());
