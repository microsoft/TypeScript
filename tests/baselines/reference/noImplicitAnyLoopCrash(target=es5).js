//// [tests/cases/compiler/noImplicitAnyLoopCrash.ts] ////

//// [noImplicitAnyLoopCrash.ts]
let foo = () => {};
let bar;
while (1) {
    bar = ~foo(...bar);
}


//// [noImplicitAnyLoopCrash.js]
"use strict";
var foo = function () { };
var bar;
while (1) {
    bar = ~foo.apply(void 0, bar);
}
