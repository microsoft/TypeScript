//// [tests/cases/compiler/globalThisDeclarationEmit3.ts] ////

//// [index.ts]
import { variable } from "./variable";
export { variable as globalThis };

//// [variable.ts]
import mod = globalThis;
export { mod as variable };

//// [variable.js]
var mod = globalThis;
export { mod as variable };
//// [index.js]
import { variable } from "./variable";
export { variable as globalThis };


//// [variable.d.ts]
import mod = globalThis;
export { mod as variable };
//// [index.d.ts]
import { variable } from "./variable";
export { variable as globalThis };
