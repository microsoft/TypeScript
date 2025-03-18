//// [tests/cases/compiler/evolvingArrayResolvedAssert.ts] ////

//// [evolvingArrayResolvedAssert.ts]
var C = [];
for (var a in C) {
    if (C.hasOwnProperty(a)) {
    }
}


//// [evolvingArrayResolvedAssert.js]
var C = [];
for (var a in C) {
    if (C.hasOwnProperty(a)) {
    }
}
