//// [internalAliasEnumInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export module c {
    import b = a.weekend;
    export var bVal: b = b.Sunday;
}

var happyFriday = c.b.Friday;

//// [internalAliasEnumInsideLocalModuleWithoutExportAccessError.js]
"use strict";
exports.__esModule = true;
var a;
exports.a = undefined;
(function (a) {
    var weekend;
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend = a.weekend || (a.weekend = {}));
})(a = exports.a || (exports.a = {}));
var c;
exports.c = undefined;
(function (c) {
    var b = a.weekend;
    c.bVal = b.Sunday;
})(c = exports.c || (exports.c = {}));
var happyFriday = c.b.Friday;
