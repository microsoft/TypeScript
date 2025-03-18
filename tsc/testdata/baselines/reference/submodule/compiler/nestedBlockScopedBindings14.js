//// [tests/cases/compiler/nestedBlockScopedBindings14.ts] ////

//// [nestedBlockScopedBindings14.ts]
var x;
for (; false;) {
    let x;
    () => x;
}

var y;
for (; false;) {
    let y;
    y = 1;
}

//// [nestedBlockScopedBindings14.js]
var x;
for (; false;) {
    let x;
    () => x;
}
var y;
for (; false;) {
    let y;
    y = 1;
}
