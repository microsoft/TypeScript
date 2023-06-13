//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck13.ts] ////

//// [ES5For-ofTypeCheck13.ts]
const strSet: Set<string> = new Set()
strSet.add('Hello')
strSet.add('World')
for (const str of strSet) { }

//// [ES5For-ofTypeCheck13.js]
var strSet = new Set();
strSet.add('Hello');
strSet.add('World');
for (var _i = 0, strSet_1 = strSet; _i < strSet_1.length; _i++) {
    var str = strSet_1[_i];
}
