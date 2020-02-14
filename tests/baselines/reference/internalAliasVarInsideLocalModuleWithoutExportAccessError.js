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
var a;
exports.a = undefined;
(function (a) {
    a.x = 10;
})(a = exports.a || (exports.a = {}));
var c;
exports.c = undefined;
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c = exports.c || (exports.c = {}));
exports.z = c.b;
