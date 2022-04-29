//// [internalAliasVarInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}

export var z = c.b;

//// [internalAliasVarInsideLocalModuleWithoutExportAccessError.js]
"use strict";
exports.__esModule = true;
exports.z = exports.c = exports.a = void 0;
var a;
(function (a) {
    a.x = 10;
})(a = exports.a || (exports.a = {}));
var c;
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c = exports.c || (exports.c = {}));
exports.z = c.b;
