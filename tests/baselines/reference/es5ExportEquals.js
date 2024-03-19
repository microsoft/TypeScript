//// [tests/cases/compiler/es5ExportEquals.ts] ////

//// [es5ExportEquals.ts]
export function f() { }

export = f;


//// [es5ExportEquals.js]
"use strict";
function f() { }
module.exports = f;


//// [es5ExportEquals.d.ts]
export declare function f(): void;
export = f;
