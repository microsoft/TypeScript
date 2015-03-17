//// [ES5For-ofTypeCheck4.ts]
var union: string | string[];
for (const v of union) { }

//// [ES5For-ofTypeCheck4.js]
var union;
for (var _i = 0; _i < union.length; _i++) {
    var v = union[_i];
}
