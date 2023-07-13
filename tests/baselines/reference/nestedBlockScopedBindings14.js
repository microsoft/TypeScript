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
var _loop_1 = function () {
    var x_1;
    (function () { return x_1; });
};
for (; false;) {
    _loop_1();
}
var y;
for (; false;) {
    var y_1 = void 0;
    y_1 = 1;
}
