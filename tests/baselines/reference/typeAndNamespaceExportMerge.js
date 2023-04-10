//// [tests/cases/conformance/externalModules/typeAndNamespaceExportMerge.ts] ////

//// [constants.ts]
// @strict

export const COFFEE = 0;
export const TEA = 1;


//// [drink.ts]
export type Drink = 0 | 1;
export * as Drink from "./constants";


//// [index.ts]
import { Drink } from "./drink";
// 'Drink' only refers to a type, but is being used as a value here
const x: Drink = Drink.TEA;


//// [constants.js]
"use strict";
// @strict
exports.__esModule = true;
exports.TEA = exports.COFFEE = void 0;
exports.COFFEE = 0;
exports.TEA = 1;
//// [drink.js]
"use strict";
exports.__esModule = true;
exports.Drink = void 0;
exports.Drink = require("./constants");
//// [index.js]
"use strict";
exports.__esModule = true;
var drink_1 = require("./drink");
// 'Drink' only refers to a type, but is being used as a value here
var x = drink_1.Drink.TEA;
