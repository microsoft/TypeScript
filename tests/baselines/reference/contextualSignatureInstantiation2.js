//// [contextualSignatureInstantiation2.ts]
// dot f g x = f(g(x))
var dot: <T, S>(f: (_: T) => S) => <U>(g: (_: U) => T) => (_: U) => S;
dot = <T, S>(f: (_: T) => S) => <U>(g: (_: U) => T): (r:U) => S => (x) => f(g(x));
var id: <T>(x:T) => T;
var r23 = dot(id)(id);

//// [contextualSignatureInstantiation2.js]
// dot f g x = f(g(x))
var dot;
dot = function (f) { return function (g) { return function (x) { return f(g(x)); }; }; };
var id;
var r23 = dot(id)(id);
