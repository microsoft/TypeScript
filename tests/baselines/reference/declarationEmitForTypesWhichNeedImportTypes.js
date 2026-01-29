//// [tests/cases/compiler/declarationEmitForTypesWhichNeedImportTypes.ts] ////

//// [b.ts]
export interface Named {}

export function createNamed(): Named {
  return {};
}
//// [a.ts]
import { createNamed } from "./b";

export const Value = createNamed();


//// [b.js]
export function createNamed() {
    return {};
}
//// [a.js]
import { createNamed } from "./b";
export const Value = createNamed();


//// [b.d.ts]
export interface Named {
}
export declare function createNamed(): Named;
//// [a.d.ts]
export declare const Value: import("./b").Named;
