//// [ES5For-of22.ts]
for (var x of [1, 2, 3]) {
    let _a = 0;
    console.log(x);
}

//// [ES5For-of22.js]
for (var _i = 0, _b = [1, 2, 3]; _i < _b.length; _i++) {
    var x = _b[_i];
    var _a = 0;
    console.log(x);
}
