//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment4.ts] ////

//// [destructuringObjectBindingPatternAndAssignment4.ts]
const {
    a = 1,
    b = 2,
    c = b, // ok
    d = a, // ok
    e = f, // error
    f = f  // error
} = { } as any;


//// [destructuringObjectBindingPatternAndAssignment4.js]
var _a = {}, _b = _a.a, a = _b === void 0 ? 1 : _b, _c = _a.b, b = _c === void 0 ? 2 : _c, _d = _a.c, c = _d === void 0 ? b : _d, // ok
_e = _a.d, // ok
d = _e === void 0 ? a : _e, // ok
_f = _a.e, // ok
e = _f === void 0 ? f : _f, // error
_g = _a.f // error
, // error
f = _g === void 0 ? f : _g // error
;
