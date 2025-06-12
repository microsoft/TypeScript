//// [tests/cases/conformance/es6/destructuring/objectBindingPatternKeywordIdentifiers02.ts] ////

//// [objectBindingPatternKeywordIdentifiers02.ts]
var { while: while } = { while: 1 }

//// [objectBindingPatternKeywordIdentifiers02.js]
var { while: , while:  } = { while: 1 };
