//// [moduleReopenedTypeSameBlock.ts]
module M { export class C1 { } }
module M {
    export interface I { n: number; }
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeSameBlock.js]
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
    var C1 = (function () {
        function C1() {
        }
        return C1;
    }());
    M.C1 = C1;
})(M || (M = {}));
(function (M) {
    var C2 = (function () {
        function C2() {
        }
        C2.prototype.f = function () { return null; };
        __names(C2.prototype, ["f"]);
        return C2;
    }());
    M.C2 = C2;
})(M || (M = {}));
