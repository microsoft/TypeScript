//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of3.ts] ////

//// [ES5For-of3.ts]
for (var v of ['a', 'b', 'c'])
    var x = v;

//// [ES5For-of3.js]
for (var _i = 0, _a = ['a', 'b', 'c']; _i < _a.length; _i++) {
    var v = _a[_i];
    var x = v;
}
//# sourceMappingURL=ES5For-of3.js.map