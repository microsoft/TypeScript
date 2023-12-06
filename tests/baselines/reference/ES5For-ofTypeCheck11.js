//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck11.ts] ////

//// [ES5For-ofTypeCheck11.ts]
var union: string | number[];
var v: string;
for (v of union) { }

//// [ES5For-ofTypeCheck11.js]
var union;
var v;
for (var _i = 0, union_1 = union; _i < union_1.length; _i++) {
    v = union_1[_i];
}
