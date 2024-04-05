//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck8.ts] ////

//// [generatorTypeCheck8.ts]
interface BadGenerator extends Iterator<number>, Iterable<string> { }
function* g3(): BadGenerator { }

//// [generatorTypeCheck8.js]
function* g3() { }
