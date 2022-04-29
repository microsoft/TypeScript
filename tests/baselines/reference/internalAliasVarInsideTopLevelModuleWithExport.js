//// [internalAliasVarInsideTopLevelModuleWithExport.ts]
export module a {
    export var x = 10;
}

export import b = a.x;
export var bVal = b;



//// [internalAliasVarInsideTopLevelModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.bVal = exports.b = exports.a = void 0;
    var a;
    (function (a) {
        a.x = 10;
    })(a = exports.a || (exports.a = {}));
    exports.b = a.x;
    exports.bVal = exports.b;
});


//// [internalAliasVarInsideTopLevelModuleWithExport.d.ts]
export declare module a {
    var x: number;
}
export import b = a.x;
export declare var bVal: number;
