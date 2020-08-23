//// [bindOperator5.ts]
const v = ::"foo"

::"foo"

//// [bindOperator5.js]
var _a;
var v = (_a = "foo".bind(void 0), "foo".bind(_a));
