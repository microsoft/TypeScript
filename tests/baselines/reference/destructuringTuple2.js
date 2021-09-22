//// [destructuringTuple2.ts]
declare const f: <T>(cb: () => T) => T;
const [a, b, c] = f(() => [1, "hi", true]);


//// [destructuringTuple2.js]
var _a = f(function () { return [1, "hi", true]; }), a = _a[0], b = _a[1], c = _a[2];
