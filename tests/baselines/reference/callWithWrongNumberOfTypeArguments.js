//// [callWithWrongNumberOfTypeArguments.ts]
function f<T, U>() { }

f<number>();
f<number, string>();
f<number, string, number>();

//// [callWithWrongNumberOfTypeArguments.js]
function f() { }
f();
f();
f();
