//// [internalAliasClassInsideLocalModuleWithoutExportAccessError.ts]
export module x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export module m2 {
    export module m3 {
        import c = x.c;
        export var cProp = new c();
        var cReturnVal = cProp.foo(10);
    }
}

export var d = new m2.m3.c();

//// [internalAliasClassInsideLocalModuleWithoutExportAccessError.js]
"use strict";
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
exports.__esModule = true;
var x;
(function (x) {
    var c = (function () {
        function c() {
        }
        c.prototype.foo = function (a) {
            return a;
        };
        __names(c.prototype, ["foo"]);
        return c;
    }());
    x.c = c;
})(x = exports.x || (exports.x = {}));
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        var c = x.c;
        m3.cProp = new c();
        var cReturnVal = m3.cProp.foo(10);
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 = exports.m2 || (exports.m2 = {}));
exports.d = new m2.m3.c();
