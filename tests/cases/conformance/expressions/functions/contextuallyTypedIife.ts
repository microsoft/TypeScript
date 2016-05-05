// arrow
(jake => { })("build");
// function expression
(function (cats) { })("lol");
// multiple arguments
((a, b, c) => { })("foo", 101, false);
// contextually typed parameters.
(f => f(1))(i => i + 1);
// default parameters
((m = 10) => m + 1)(12);
((n = 10) => n + 1)();
// optional parameters
((j?) => j + 1)(12);
((k?) => k + 1)();
((l, o?) => l + o)(12); // o should be any
// rest parameters
((...numbers) => numbers.every(n => n > 0))(5,6,7);
((...noNumbers) => noNumbers.some(n => n > 0))();
((first, ...rest) => first ? [] : rest.map(n => n > 0))(8,9,10);
// destructuring parameters (with defaults too!)
(({ q }) => q)({ q : 13 });
(({ p = 14 }) => p)({ p : 15 });
(({ r = 17 } = { r: 18 }) => r)({r : 19});
(({ u = 22 } = { u: 23 }) => u)();


