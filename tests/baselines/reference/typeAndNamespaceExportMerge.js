//// [tests/cases/conformance/externalModules/typeAndNamespaceExportMerge.ts] ////

//// [constants.ts]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEA = exports.COFFEE = void 0;
exports.COFFEE = 0;
exports.TEA = 1;
//// [drink.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drink = void 0;
exports.Drink = require("./constants");
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drink_1 = require("./drink");
// 'Drink' only refers to a type, but is being used as a value here
var x = drink_1.Drink.TEA;
