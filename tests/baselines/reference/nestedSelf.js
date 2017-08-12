//// [nestedSelf.ts]
module M {
 export class C {
   public n = 42;
   public foo() { [1,2,3].map((x) => { return this.n * x; })}
 }
}



//// [nestedSelf.js]
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
var M;
(function (M) {
    var C = (function () {
        function C() {
            this.n = 42;
        }
        C.prototype.foo = function () {
            var _this = this;
            [1, 2, 3].map(function (x) { return _this.n * x; });
        };
        __names(C.prototype, ["foo"]);
        return C;
    }());
    M.C = C;
})(M || (M = {}));
