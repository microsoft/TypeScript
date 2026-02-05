//// [tests/cases/compiler/nonexistentPropertyOnUnion.ts] ////

//// [nonexistentPropertyOnUnion.ts]
function f(x: string | Promise<string>) {
    x.toLowerCase();
}


//// [nonexistentPropertyOnUnion.js]
"use strict";
function f(x) {
    x.toLowerCase();
}
