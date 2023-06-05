//// [tests/cases/conformance/node/nodeMOdulesOutDirPackageJson05_declarationDir.ts] ////

//// [package.json]
{ "type": "module" }

//// [a.ts]
import { b } from "./b";

//// [b.ts]
export const b = 0;




//// [a.d.ts]
export {};
//// [b.d.ts]
export declare const b = 0;
