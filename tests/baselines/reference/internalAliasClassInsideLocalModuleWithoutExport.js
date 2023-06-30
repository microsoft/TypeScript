//// [tests/cases/compiler/internalAliasClassInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasClassInsideLocalModuleWithoutExport.ts]
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

//// [internalAliasClassInsideLocalModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m2 = exports.x = void 0;
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
})(x || (exports.x = x = {}));
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        var c = x.c;
        m3.cProp = new c();
        var cReturnVal = m3.cProp.foo(10);
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 || (exports.m2 = m2 = {}));


//// [internalAliasClassInsideLocalModuleWithoutExport.d.ts]
export declare namespace x {
    class c {
        foo(a: number): number;
    }
}
export declare namespace m2 {
    namespace m3 {
        import c = x.c;
        var cProp: c;
    }
}
