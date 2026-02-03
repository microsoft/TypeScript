//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of14.ts] ////

//// [ES5For-of14.ts]
for (const v of []) {
    var x = v;
}

//// [ES5For-of14.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    var x = v;
}
