//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck14.ts] ////

//// [ES5For-ofTypeCheck14.ts]
var union: string | Set<number>
for (const e of union) { }

//// [ES5For-ofTypeCheck14.js]
var union;
for (var _i = 0, union_1 = union; _i < union_1.length; _i++) {
    var e = union_1[_i];
}
