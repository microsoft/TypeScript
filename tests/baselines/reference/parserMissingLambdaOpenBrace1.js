//// [parserMissingLambdaOpenBrace1.ts]
class C {
    where(filter: Iterator<T, boolean>): Query<T> {
        return fromDoWhile(test =>
            var index = 0;
            return this.doWhile((item, i) => filter(item, i) ? test(item, index++) : true);
        });
    }
}

//// [parserMissingLambdaOpenBrace1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
    C.prototype.where = function (filter) {
        var _this = this;
        return fromDoWhile(function (test) {
            var index = 0;
            return _this.doWhile(function (item, i) { return filter(item, i) ? test(item, index++) : true; });
        });
    };
    __names(C.prototype, ["where"]);
    return C;
}());
