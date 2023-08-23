//// [tests/cases/conformance/expressions/functions/contextuallyTypedIifeStrict.ts] ////

//// [contextuallyTypedIifeStrict.ts]
// arrow
(jake => { })("build");
// function expression
(function (cats) { })("lol");
// Lots of Irritating Superfluous Parentheses
(function (x) { } ("!"));
((((function (y) { }))))("-");
// multiple arguments
((a, b, c) => { })("foo", 101, false);
// default parameters
((m = 10) => m + 1)(12);
((n = 10) => n + 1)();
// optional parameters
((j?) => j + 1)(12);
((k?) => k + 1)();
((l, o?) => l + o)(12);
// rest parameters
((...numbers) => numbers.every(n => n > 0))(5,6,7);
((...mixed) => mixed.every(n => !!n))(5,'oops','oh no');
((...noNumbers) => noNumbers.some(n => n > 0))();
((first, ...rest) => first ? [] : rest.map(n => n > 0))(8,9,10);
// destructuring parameters (with defaults too!)
(({ q }) => q)({ q : 13 });
(({ p = 14 }) => p)({ p : 15 });
(({ r = 17 } = { r: 18 }) => r)({r : 19});
(({ u = 22 } = { u: 23 }) => u)();
// contextually typed parameters.
let twelve = (f => f(12))(i => i);
let eleven = (o => o.a(11))({ a: function(n) { return n; } });
// missing arguments
(function(x, undefined) { return x; })(42);
((x, y, z) => 42)();


//// [contextuallyTypedIifeStrict.js]
// arrow
(function (jake) { })("build");
// function expression
(function (cats) { })("lol");
// Lots of Irritating Superfluous Parentheses
(function (x) { }("!"));
((((function (y) { }))))("-");
// multiple arguments
(function (a, b, c) { })("foo", 101, false);
// default parameters
(function (m) {
    if (m === void 0) { m = 10; }
    return m + 1;
})(12);
(function (n) {
    if (n === void 0) { n = 10; }
    return n + 1;
})();
// optional parameters
(function (j) { return j + 1; })(12);
(function (k) { return k + 1; })();
(function (l, o) { return l + o; })(12);
// rest parameters
(function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.every(function (n) { return n > 0; });
})(5, 6, 7);
(function () {
    var mixed = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mixed[_i] = arguments[_i];
    }
    return mixed.every(function (n) { return !!n; });
})(5, 'oops', 'oh no');
(function () {
    var noNumbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        noNumbers[_i] = arguments[_i];
    }
    return noNumbers.some(function (n) { return n > 0; });
})();
(function (first) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return first ? [] : rest.map(function (n) { return n > 0; });
})(8, 9, 10);
// destructuring parameters (with defaults too!)
(function (_a) {
    var q = _a.q;
    return q;
})({ q: 13 });
(function (_a) {
    var _b = _a.p, p = _b === void 0 ? 14 : _b;
    return p;
})({ p: 15 });
(function (_a) {
    var _b = _a === void 0 ? { r: 18 } : _a, _c = _b.r, r = _c === void 0 ? 17 : _c;
    return r;
})({ r: 19 });
(function (_a) {
    var _b = _a === void 0 ? { u: 23 } : _a, _c = _b.u, u = _c === void 0 ? 22 : _c;
    return u;
})();
// contextually typed parameters.
var twelve = (function (f) { return f(12); })(function (i) { return i; });
var eleven = (function (o) { return o.a(11); })({ a: function (n) { return n; } });
// missing arguments
(function (x, undefined) { return x; })(42);
(function (x, y, z) { return 42; })();
