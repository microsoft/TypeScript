//// [destructuringNoFreshLiteralLeak.ts]
const { x = () => ({a: 12}) } = { x: () => ({a: 24, b: 12}) };
declare function f(x: {a: number}): void;
f(x());


//// [destructuringNoFreshLiteralLeak.js]
var _a = { x: function () { return ({ a: 24, b: 12 }); } }.x, x = _a === void 0 ? function () { return ({ a: 12 }); } : _a;
f(x());
