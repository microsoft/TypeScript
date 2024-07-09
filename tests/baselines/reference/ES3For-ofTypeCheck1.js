//// [tests/cases/conformance/statements/for-ofStatements/ES3For-ofTypeCheck1.ts] ////

//// [ES3For-ofTypeCheck1.ts]
for (var v of "") { }

//// [ES3For-ofTypeCheck1.js]
for (var _i = 0, _a = ""; _i < _a.length; _i++) {
    var v = _a[_i];
}
