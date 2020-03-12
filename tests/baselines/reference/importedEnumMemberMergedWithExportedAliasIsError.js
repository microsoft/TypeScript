//// [tests/cases/compiler/importedEnumMemberMergedWithExportedAliasIsError.ts] ////

//// [enum.ts]
export enum Enum {
    A,
    B
}
//// [alias.ts]
import {Enum} from "./enum";

import EnumA = Enum.A;

export type EnumA = [string] | [string, number];


//// [enum.js]
"use strict";
exports.__esModule = true;
exports.Enum = void 0;
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
})(Enum = exports.Enum || (exports.Enum = {}));
//// [alias.js]
"use strict";
exports.__esModule = true;
