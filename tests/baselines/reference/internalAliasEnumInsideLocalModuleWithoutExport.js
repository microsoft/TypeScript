//// [tests/cases/compiler/internalAliasEnumInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasEnumInsideLocalModuleWithoutExport.ts]
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


//// [internalAliasEnumInsideLocalModuleWithoutExport.js]
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
    var b = a.weekend;
    c.bVal = b.Sunday;
})(c || (exports.c = c = {}));


//// [internalAliasEnumInsideLocalModuleWithoutExport.d.ts]
export declare namespace a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2
    }
}
export declare namespace c {
    import b = a.weekend;
    var bVal: b;
}
