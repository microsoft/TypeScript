//// [tests/cases/compiler/issue65433NonstandardNewlineASI.ts] ////

//// [issue65433NonstandardNewlineASI.ts]
const a = (x: number) => x (1)
const b = (x: number) => x     (1)
const c = (x: number) => x     (1)


//// [issue65433NonstandardNewlineASI.js]
"use strict";
const a = (x) => x(1);
const b = (x) => x(1);
const c = (x) => x(1);
