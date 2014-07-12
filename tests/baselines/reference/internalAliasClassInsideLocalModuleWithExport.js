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
(function (x) {
    var c = (function () {
        function c() {
        }
        c.prototype.foo = function (a) {
            return a;
        };
        return c;
    })();
    x.c = c;
})(exports.x || (exports.x = {}));
var x = exports.x;
(function (m2) {
    (function (m3) {
        m3.c = x.c;
        m3.cProp = new m3.c();
        var cReturnVal = m3.cProp.foo(10);
    })(m2.m3 || (m2.m3 = {}));
    var m3 = m2.m3;
})(exports.m2 || (exports.m2 = {}));
var m2 = exports.m2;
exports.d = new m2.m3.c();


//// [internalAliasClassInsideLocalModuleWithExport.d.ts]
export declare module x {
    class c {
        foo(a);
    }
}
export declare module m2 {
    module m3 {
        export import c = x.c;
        var cProp;
        var cReturnVal;
    }
}
export declare var d;
