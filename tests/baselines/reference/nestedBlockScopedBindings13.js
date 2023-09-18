//// [tests/cases/compiler/nestedBlockScopedBindings13.ts] ////

//// [nestedBlockScopedBindings13.ts]
for (; false;) {
    let x;
    () => x;
}

for (; false;) {
    let y;
    y = 1;
}

//// [nestedBlockScopedBindings13.js]
var _loop_1 = function () {
    var x;
    (function () { return x; });
};
for (; false;) {
    _loop_1();
}
for (; false;) {
    var y = void 0;
    y = 1;
}
