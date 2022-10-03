//// [controlFlowNullishCoalesce.ts]
// assignments in shortcutting rhs
let a: number;
o ?? (a = 1);
a.toString();

// assignment flow
declare const o: { x: number } | undefined;
let x: { x: number } | boolean;
if (x = o ?? true) {
    x;
}



//// [controlFlowNullishCoalesce.js]
"use strict";
// assignments in shortcutting rhs
var a;
o !== null && o !== void 0 ? o : (a = 1);
a.toString();
var x;
if (x = o !== null && o !== void 0 ? o : true) {
    x;
}
