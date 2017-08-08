//// [anonterface.ts]
module M {
    export class C {
        m(fn:{ (n:number):string; },n2:number):string {
            return fn(n2);
        }
    }
}

var c=new M.C();
c.m(function(n) { return "hello: "+n; },18);





//// [anonterface.js]
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
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype.m = function (fn, n2) {
            return fn(n2);
        };
        __names(C.prototype, ["m"]);
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var c = new M.C();
c.m(function (n) { return "hello: " + n; }, 18);
