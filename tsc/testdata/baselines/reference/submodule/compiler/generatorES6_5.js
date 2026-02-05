//// [tests/cases/compiler/generatorES6_5.ts] ////

//// [generatorES6_5.ts]
function* foo() {
    yield a ? b : c;
}

//// [generatorES6_5.js]
"use strict";
function* foo() {
    yield a ? b : c;
}
