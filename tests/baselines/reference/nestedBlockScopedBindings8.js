//// [tests/cases/compiler/nestedBlockScopedBindings8.ts] ////

//// [nestedBlockScopedBindings8.ts]
var x;
for (let x; false; ) {
    () => x;
}

var y;
for (let y; false; ) {
    y = 1;
}

//// [nestedBlockScopedBindings8.js]
var x;
for (let x; false;) {
    () => x;
}
var y;
for (let y; false;) {
    y = 1;
}
