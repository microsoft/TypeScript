//// [tests/cases/compiler/internalAliasEnumInsideLocalModuleWithExport.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.a = void 0;
var a;
(function (a) {
    var weekend;
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend = a.weekend || (a.weekend = {}));
})(a || (exports.a = a = {}));
var c;
(function (c) {
    c.b = a.weekend;
    c.bVal = c.b.Sunday;
})(c || (exports.c = c = {}));


//// [internalAliasEnumInsideLocalModuleWithExport.d.ts]
export declare namespace a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2
    }
}
export declare namespace c {
    export import b = a.weekend;
    var bVal: b;
}
