//// [internalAliasInitializedModuleInsideLocalModuleWithExport.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

export module c {
    export import b = a.b;
    export var x: b.c = new b.c();
}

//// [internalAliasInitializedModuleInsideLocalModuleWithExport.js]
define(["require", "exports"], function(require, exports) {
    (function (a) {
        (function (b) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            b.c = c;
        })(a.b || (a.b = {}));
        var b = a.b;
    })(exports.a || (exports.a = {}));
    var a = exports.a;

    (function (c) {
        var b = a.b;
        c.b = b;
        c.x = new b.c();
    })(exports.c || (exports.c = {}));
    var c = exports.c;
});


////[internalAliasInitializedModuleInsideLocalModuleWithExport.d.ts]
export declare module a {
    module b {
        class c {
        }
    }
}
export declare module c {
    export import b = a.b;
    var x: b.c;
}
