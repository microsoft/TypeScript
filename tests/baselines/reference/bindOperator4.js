//// [bindOperator4.ts]
const v = ::func;
const v2 = ::foo.bar::func;

::func

//// [bindOperator4.js]
var _a, _b;
var v = func.bind(void 0);
var v2 = (_b = (_a = foo).bar.bind(_a), func.bind(_b));
func.bind(void 0);
