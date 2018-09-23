//// [internalAliasEnumInsideLocalModuleWithExport.ts]
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export module c {
    export import b = a.weekend;
    export var bVal: b = b.Sunday;
}


//// [internalAliasEnumInsideLocalModuleWithExport.js]
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
    c.b = a.weekend;
    c.bVal = c.b.Sunday;
})(c);


//// [internalAliasEnumInsideLocalModuleWithExport.d.ts]
export declare module a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2
    }
}
export declare module c {
    export import b = a.weekend;
    var bVal: b;
}
