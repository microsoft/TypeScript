//// [tests/cases/compiler/transformParenthesizesConditionalSubexpression.ts] ////

//// [transformParenthesizesConditionalSubexpression.ts]
var K = 'k'
var a = { p  : (true ? { [K] : 'v'}        : null) }
var b = { p  : (true ? { [K] : 'v'} as any : null) }

//// [transformParenthesizesConditionalSubexpression.js]
var K = 'k';
var a = { p: (true ? { [K]: 'v' } : null) };
var b = { p: (true ? { [K]: 'v' } : null) };
