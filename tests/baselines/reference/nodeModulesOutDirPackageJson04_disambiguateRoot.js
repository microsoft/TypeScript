//// [tests/cases/conformance/node/nodeModulesOutDirPackageJson04_disambiguateRoot.ts] ////

//// [package.json]
{ "type": "module" }

//// [c.ts]
export {};

//// [a.ts]
import { b } from "./b.js";

//// [b.ts]
export const b = 0;
export * from "../c.js";


//// [c.js]
export {};
//// [b.js]
export const b = 0;
export * from "../c.js";
//// [a.js]
export {};
