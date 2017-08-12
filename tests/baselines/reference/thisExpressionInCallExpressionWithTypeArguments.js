//// [thisExpressionInCallExpressionWithTypeArguments.ts]
class C {
    public foo() { [1,2,3].map<any,any>((x) => { return this; })}
}


//// [thisExpressionInCallExpressionWithTypeArguments.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var _this = this;
        [1, 2, 3].map(function (x) { return _this; });
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
