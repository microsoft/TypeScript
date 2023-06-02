//// [tests/cases/conformance/node/nodeModulesOutDirPackageJson01.ts] ////

//// [package.json]
{ "type": "module" }

//// [a.ts]
import { b } from "./b";

//// [b.ts]
export const b = 0;


//// [/out/a.js]
export {};
//// [/out/b.js]
export var b = 0;
