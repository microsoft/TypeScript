//// [tests/cases/compiler/typeArgumentArityErrorSkipsTrivia.ts] ////

//// [typeArgumentArityErrorSkipsTrivia.ts]
declare function f<T>(a: T): T;

f<   string, number>("a");

f<
    string, number>("a");


//// [typeArgumentArityErrorSkipsTrivia.js]
"use strict";
f("a");
f("a");
