//// [tests/cases/compiler/internalAliasEnumInsideTopLevelModuleWithoutExport.ts] ////

//// [internalAliasEnumInsideTopLevelModuleWithoutExport.ts]
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

import b = a.weekend;
export var bVal: b = b.Sunday;


//// [internalAliasEnumInsideTopLevelModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bVal = exports.a = void 0;
var a;
(function (a) {
    let weekend;
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend = a.weekend || (a.weekend = {}));
})(a || (exports.a = a = {}));
exports.bVal = b.Sunday;
