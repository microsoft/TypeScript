//// [noImplicitAnyLoopCrash.ts]
let foo = () => {};
let bar;
while (1) {
    bar = ~foo(...bar);
}


//// [noImplicitAnyLoopCrash.js]
var foo = function foo() { };
var bar;
while (1) {
    bar = ~foo.apply(void 0, bar);
}
