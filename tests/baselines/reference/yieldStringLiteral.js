//// [tests/cases/compiler/yieldStringLiteral.ts] ////

//// [yieldStringLiteral.ts]
function yieldString() {
    yield 'literal';
}


//// [yieldStringLiteral.js]
"use strict";
function yieldString() {
    yield 'literal';
}
