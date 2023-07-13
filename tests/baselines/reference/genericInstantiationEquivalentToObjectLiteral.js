//// [tests/cases/conformance/types/namedTypes/genericInstantiationEquivalentToObjectLiteral.ts] ////

//// [genericInstantiationEquivalentToObjectLiteral.ts]
interface Pair<T1, T2> { first: T1; second: T2; }
var x: Pair<string, number>
var y: { first: string; second: number; }

x = y;
y = x;

declare function f<T, U>(x: Pair<T, U>);
declare function f2<T, U>(x: { first: T; second: U; });

f(x);
f(y);
f2(x);
f2(y);

//// [genericInstantiationEquivalentToObjectLiteral.js]
var x;
var y;
x = y;
y = x;
f(x);
f(y);
f2(x);
f2(y);
