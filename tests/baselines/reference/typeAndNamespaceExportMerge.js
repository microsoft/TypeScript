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
export const COFFEE = 0;
export const TEA = 1;
//// [drink.js]
import * as Drink_1 from "./constants";
export { Drink_1 as Drink };
//// [index.js]
import { Drink } from "./drink";
// 'Drink' only refers to a type, but is being used as a value here
const x = Drink.TEA;
