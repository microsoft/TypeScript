//// [nestedBlockScopedBindings7.ts]
for (let x; false;) {
    () => x;
}

for (let y; false;) {
    y = 1;
}

//// [nestedBlockScopedBindings7.js]
var _loop_1 = function (x) {
    (function () { return x; });
};
for (var x = void 0; false;) {
    _loop_1(x);
}
for (var y = void 0; false;) {
    y = 1;
}
