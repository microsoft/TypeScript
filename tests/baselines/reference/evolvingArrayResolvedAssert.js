//// [tests/cases/compiler/evolvingArrayResolvedAssert.ts] ////

//// [evolvingArrayResolvedAssert.ts]
var C = [];
for (var a in C) {
    if (C.hasOwnProperty(a)) {
    }
}


//// [evolvingArrayResolvedAssert.js]
"use strict";
var C = [];
for (var a in C) {
    if (C.hasOwnProperty(a)) {
    }
}
