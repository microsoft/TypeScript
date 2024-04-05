//// [tests/cases/conformance/es6/destructuring/objectBindingPatternKeywordIdentifiers03.ts] ////

//// [objectBindingPatternKeywordIdentifiers03.ts]
var { "while" } = { while: 1 }

//// [objectBindingPatternKeywordIdentifiers03.js]
var  = { while: 1 }["while"];
