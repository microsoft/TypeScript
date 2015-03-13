//// [ES5For-of22.ts]
for (var x of [1, 2, 3]) {
    let _a = 0;
    console.log(x);
}

//// [ES5For-of22.js]
for (var _i = 0, _a = [
    1,
    2,
    3
]; _i < _a.length; _i++) {
    var x = _a[_i];
    var _a_1 = 0;
    console.log(x);
}
