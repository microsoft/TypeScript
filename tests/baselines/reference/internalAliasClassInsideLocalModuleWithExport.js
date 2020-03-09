//// [internalAliasClassInsideLocalModuleWithExport.ts]
export module x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export module m2 {
    export module m3 {
        export import c = x.c;
        export var cProp = new c();
        var cReturnVal = cProp.foo(10);
    }
}

export var d = new m2.m3.c();

//// [internalAliasClassInsideLocalModuleWithExport.js]
"use strict";
exports.__esModule = true;
exports.d = exports.m2 = exports.x = void 0;
var x;
(function (x) {
    var c = /** @class */ (function () {
        function c() {
        }
        c.prototype.foo = function (a) {
            return a;
        };
        return c;
    }());
    x.c = c;
})(x = exports.x || (exports.x = {}));
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        m3.c = x.c;
        m3.cProp = new m3.c();
        var cReturnVal = m3.cProp.foo(10);
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 = exports.m2 || (exports.m2 = {}));
exports.d = new m2.m3.c();


//// [internalAliasClassInsideLocalModuleWithExport.d.ts]
export declare module x {
    class c {
        foo(a: number): number;
    }
}
export declare module m2 {
    module m3 {
        export import c = x.c;
        var cProp: c;
    }
}
export declare var d: x.c;
