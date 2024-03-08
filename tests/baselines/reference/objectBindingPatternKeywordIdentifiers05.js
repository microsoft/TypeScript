//// [tests/cases/conformance/es6/destructuring/objectBindingPatternKeywordIdentifiers05.ts] ////

//// [objectBindingPatternKeywordIdentifiers05.ts]
var { as } = { as: 1 }

//// [objectBindingPatternKeywordIdentifiers05.js]
var as = { as: 1 }.as;
