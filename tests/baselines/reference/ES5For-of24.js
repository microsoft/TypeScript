//// [ES5For-of24.ts]
var a = [1, 2, 3];
for (var v of a) {
    let a = 0;
}

//// [ES5For-of24.js]
var a = [1, 2, 3];
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    var v = a_1[_i];
    var a_2 = 0;
}
