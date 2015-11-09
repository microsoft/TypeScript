//// [ES5For-ofTypeCheck8.ts]
var union: string | string[]| number[]| symbol[];
var v: symbol;
for (v of union) { }

//// [ES5For-ofTypeCheck8.js]
var union;
var v;
for (var _i = 0, union_1 = union; _i < union_1.length; _i++) {
    v = union_1[_i];
}
