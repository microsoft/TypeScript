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
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = exports.a = void 0;
    var a;
    (function (a) {
        var b;
        (function (b) {
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            b.c = c;
        })(b = a.b || (a.b = {}));
    })(a = exports.a || (exports.a = {}));
    var b = a.b;
    exports.x = new b.c();
});


//// [internalAliasInitializedModuleInsideTopLevelModuleWithoutExport.d.ts]
export declare module a {
    module b {
        class c {
        }
    }
}
import b = a.b;
export declare var x: b.c;
