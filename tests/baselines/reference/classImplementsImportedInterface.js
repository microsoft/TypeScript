//// [classImplementsImportedInterface.ts]
module M1 {
    export interface I {
        foo();
    }
}

module M2 {
    import T = M1.I;
    class C implements T {
        foo() {}
    }
}

//// [classImplementsImportedInterface.js]
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
var M2;
(function (M2) {
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        __names(C.prototype, ["foo"]);
        return C;
    }());
})(M2 || (M2 = {}));
