//// [tests/cases/compiler/uniqueSymbolPropertyNameFromReexportedModule.ts] ////

//// [b.ts]
export const key: unique symbol = Symbol();

//// [c.ts]
export { key } from "./b";

//// [a.ts]
import { key } from "./c";
declare const o: {};
o[key];


//// [b.js]
export const key = Symbol();
//// [c.js]
export { key } from "./b";
//// [a.js]
import { key } from "./c";
o[key];
