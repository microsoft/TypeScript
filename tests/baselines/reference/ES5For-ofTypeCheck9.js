//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck9.ts] ////

//// [ES5For-ofTypeCheck9.ts]
var union: string | string[] | number | symbol;
for (let v of union) { }

//// [ES5For-ofTypeCheck9.js]
var union;
for (var _i = 0, union_1 = union; _i < union_1.length; _i++) {
    var v = union_1[_i];
}
