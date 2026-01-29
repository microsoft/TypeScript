//// [tests/cases/compiler/moduleResolutionWithSymlinks_notInNodeModules.ts] ////

//// [abc.ts]
export const x = 0;

//// [app.ts]
import { x } from "./shared/abc";
import { x as x2 } from "./shared2/abc";
x + x2;


//// [/src/bin/shared/abc.js]
export const x = 0;
//// [/src/bin/shared2/abc.js]
export const x = 0;
//// [/src/bin/app.js]
import { x } from "./shared/abc";
import { x as x2 } from "./shared2/abc";
x + x2;
