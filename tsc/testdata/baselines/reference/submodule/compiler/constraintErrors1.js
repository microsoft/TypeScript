//// [tests/cases/compiler/constraintErrors1.ts] ////

//// [constraintErrors1.ts]
function foo5<T extends hm>(test: T) { }

//// [constraintErrors1.js]
function foo5(test) { }
