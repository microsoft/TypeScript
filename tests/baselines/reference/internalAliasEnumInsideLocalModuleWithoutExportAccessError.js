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
var a = {};
(function (a) {
    var weekend = a.weekend || (a.weekend = {});
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend);
})(a);
var c = {};
(function (c) {
    var b = a.weekend;
    c.bVal = b.Sunday;
})(c);
var happyFriday = c.b.Friday;
