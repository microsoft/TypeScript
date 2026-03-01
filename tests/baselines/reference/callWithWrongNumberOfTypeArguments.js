//// [tests/cases/compiler/callWithWrongNumberOfTypeArguments.ts] ////

//// [callWithWrongNumberOfTypeArguments.ts]
function f<T, U>() { }

f<number>();
f<number, string>();
f<number, string, number>();

//// [callWithWrongNumberOfTypeArguments.js]
"use strict";
function f() { }
f();
f();
f();
