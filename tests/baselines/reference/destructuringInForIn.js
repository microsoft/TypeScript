//// [destructuringInForIn.ts]
for (let {toString, toLowerCase} in []) {}

//// [destructuringInForIn.js]
for (var _a = void 0, toString = _a.toString, toLowerCase = _a.toLowerCase in []) { }
