//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck2.ts] ////

//// [ES5For-ofTypeCheck2.ts]
for (var v of [true]) { }

//// [ES5For-ofTypeCheck2.js]
for (var _i = 0, _a = [true]; _i < _a.length; _i++) {
    var v = _a[_i];
}
