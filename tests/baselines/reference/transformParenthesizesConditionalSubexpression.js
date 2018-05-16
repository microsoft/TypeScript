//// [transformParenthesizesConditionalSubexpression.ts]
var K = 'k'
var a = { p  : (true ? { [K] : 'v'}        : null) }
var b = { p  : (true ? { [K] : 'v'} as any : null) }

//// [transformParenthesizesConditionalSubexpression.js]
var _a, _b;
var K = 'k';
var a = { p: (true ? (_a = {}, _a[K] = 'v', _a) : null) };
var b = { p: (true ? (_b = {}, _b[K] = 'v', _b) : null) };
