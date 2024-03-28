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
var _loop_1 = function (x_1) {
    (function () { return x_1; });
};
for (var x_1; false;) {
    _loop_1(x_1);
}
var y;
for (var y_1; false;) {
    y_1 = 1;
}
