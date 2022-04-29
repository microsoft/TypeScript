//// [internalAliasClassInsideTopLevelModuleWithoutExport.ts]
export module x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

import xc = x.c;
export var cProp = new xc();
var cReturnVal = cProp.foo(10);

//// [internalAliasClassInsideTopLevelModuleWithoutExport.js]
"use strict";
exports.__esModule = true;
exports.cProp = exports.x = void 0;
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
var xc = x.c;
exports.cProp = new xc();
var cReturnVal = exports.cProp.foo(10);


//// [internalAliasClassInsideTopLevelModuleWithoutExport.d.ts]
export declare module x {
    class c {
        foo(a: number): number;
    }
}
import xc = x.c;
export declare var cProp: xc;
