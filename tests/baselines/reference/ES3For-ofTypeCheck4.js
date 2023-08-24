//// [tests/cases/conformance/statements/for-ofStatements/ES3For-ofTypeCheck4.ts] ////

//// [ES3For-ofTypeCheck4.ts]
var union: string | string[];
for (const v of union) { }

//// [ES3For-ofTypeCheck4.js]
var union;
for (var _i = 0, union_1 = union; _i < union_1.length; _i++) {
    var v = union_1[_i];
}
