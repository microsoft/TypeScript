//// [tests/cases/compiler/noImplicitAnyLoopCrash.ts] ////

//// [noImplicitAnyLoopCrash.ts]
let foo = () => {};
let bar;
while (1) {
    bar = ~foo(...bar);
}


//// [noImplicitAnyLoopCrash.js]
let foo = () => { };
let bar;
while (1) {
    bar = ~foo(...bar);
}
