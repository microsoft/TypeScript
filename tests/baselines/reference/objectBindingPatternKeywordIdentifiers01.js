//// [tests/cases/conformance/es6/destructuring/objectBindingPatternKeywordIdentifiers01.ts] ////

//// [objectBindingPatternKeywordIdentifiers01.ts]
var { while } = { while: 1 }

//// [objectBindingPatternKeywordIdentifiers01.js]
var  = { while: 1 }.while;
