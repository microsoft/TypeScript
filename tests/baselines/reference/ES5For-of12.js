//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of12.ts] ////

//// [ES5For-of12.ts]
for ([""] of [[""]]) { }

//// [ES5For-of12.js]
for (var _i = 0, _a = [[""]]; _i < _a.length; _i++) {
    "" = _a[_i][0];
}
