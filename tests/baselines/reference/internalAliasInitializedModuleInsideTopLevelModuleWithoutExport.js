//// [internalAliasInitializedModuleInsideTopLevelModuleWithoutExport.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

import b = a.b;
export var x: b.c = new b.c();

//// [internalAliasInitializedModuleInsideTopLevelModuleWithoutExport.js]
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

    var b = a.b;
    exports.x = new b.c();
});


////[internalAliasInitializedModuleInsideTopLevelModuleWithoutExport.d.ts]
export declare module a {
    module b {
        class c {
        }
    }
}
export declare var x: a.b.c;
