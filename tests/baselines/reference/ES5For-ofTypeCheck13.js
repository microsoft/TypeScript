//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck13.ts] ////

//// [ES5For-ofTypeCheck13.ts]
const strSet: Set<string> = new Set()
strSet.add('Hello')
strSet.add('World')
for (const str of strSet) { }

//// [ES5For-ofTypeCheck13.js]
const strSet = new Set();
strSet.add('Hello');
strSet.add('World');
for (const str of strSet) { }
