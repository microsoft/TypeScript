//// [ES5For-ofTypeCheck3.ts]
var tuple: [string, number] = ["", 0];
for (var v of tuple) { }

//// [ES5For-ofTypeCheck3.js]
var tuple = ["", 0];
for (var _i = 0, tuple_1 = tuple; _i < tuple_1.length; _i++) {
    var v = tuple_1[_i];
}
