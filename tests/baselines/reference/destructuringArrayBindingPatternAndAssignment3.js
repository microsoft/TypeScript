//// [tests/cases/conformance/es6/destructuring/destructuringArrayBindingPatternAndAssignment3.ts] ////

//// [destructuringArrayBindingPatternAndAssignment3.ts]
const [a, b = a] = [1]; // ok
const [c, d = c, e = e] = [1]; // error for e = e
const [f, g = f, h = i, i = f] = [1]; // error for h = i

(function ([a, b = a]) { // ok
})([1]);
(function ([c, d = c, e = e]) { // error for e = e
})([1]);
(function ([f, g = f, h = i, i = f]) { // error for h = i
})([1])


//// [destructuringArrayBindingPatternAndAssignment3.js]
var _a = [1], a = _a[0], _b = _a[1], b = _b === void 0 ? a : _b; // ok
var _c = [1], c = _c[0], _d = _c[1], d = _d === void 0 ? c : _d, _e = _c[2], e = _e === void 0 ? e : _e; // error for e = e
var _f = [1], f = _f[0], _g = _f[1], g = _g === void 0 ? f : _g, _h = _f[2], h = _h === void 0 ? i : _h, _j = _f[3], i = _j === void 0 ? f : _j; // error for h = i
(function (_a) {
    var a = _a[0], _b = _a[1], b = _b === void 0 ? a : _b;
})([1]);
(function (_a) {
    var c = _a[0], _b = _a[1], d = _b === void 0 ? c : _b, _c = _a[2], e = _c === void 0 ? e : _c;
})([1]);
(function (_a) {
    var f = _a[0], _b = _a[1], g = _b === void 0 ? f : _b, _c = _a[2], h = _c === void 0 ? i : _c, _d = _a[3], i = _d === void 0 ? f : _d;
})([1]);
