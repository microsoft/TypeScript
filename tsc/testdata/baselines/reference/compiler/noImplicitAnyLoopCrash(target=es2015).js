//// [tests/cases/compiler/noImplicitAnyLoopCrash.ts] ////

//// [noImplicitAnyLoopCrash.ts]
let foo = () => {};
let bar;
while (1) {
    bar = ~foo(...bar);
}


//// [noImplicitAnyLoopCrash.js]
"use strict";
let foo = () => { };
let bar;
while (1) {
    bar = ~foo(...bar);
}
