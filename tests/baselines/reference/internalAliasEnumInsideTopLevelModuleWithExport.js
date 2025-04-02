//// [tests/cases/compiler/internalAliasEnumInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasEnumInsideTopLevelModuleWithExport.ts]
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export import b = a.weekend;
export var bVal: b = b.Sunday;


//// [internalAliasEnumInsideTopLevelModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bVal = exports.b = exports.a = void 0;
    var a;
    (function (a) {
        var weekend;
        (function (weekend) {
            weekend[weekend["Friday"] = 0] = "Friday";
            weekend[weekend["Saturday"] = 1] = "Saturday";
            weekend[weekend["Sunday"] = 2] = "Sunday";
        })(weekend = a.weekend || (a.weekend = {}));
    })(a || (exports.a = a = {}));
    exports.b = a.weekend;
    exports.bVal = exports.b.Sunday;
});


//// [internalAliasEnumInsideTopLevelModuleWithExport.d.ts]
export declare namespace a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2
    }
}
export import b = a.weekend;
export declare var bVal: b;
