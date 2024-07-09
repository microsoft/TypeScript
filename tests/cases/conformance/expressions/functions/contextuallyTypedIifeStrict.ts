// @strictNullChecks: true
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
