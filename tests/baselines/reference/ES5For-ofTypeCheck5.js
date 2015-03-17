//// [ES5For-ofTypeCheck5.ts]
var union: string | number[];
for (var v of union) { }

//// [ES5For-ofTypeCheck5.js]
var union;
for (var _i = 0; _i < union.length; _i++) {
    var v = union[_i];
}
