//// [issue52757.ts]
function f<T>(args: typeof f<T>): T { return args; }

function g<T = typeof g>(args: T): T { return args; }

function h<T>(): typeof h<T> { return h; }


//// [issue52757.js]
"use strict";
function f(args) { return args; }
function g(args) { return args; }
function h() { return h; }


//// [issue52757.d.ts]
declare function f<T>(args: typeof f<T>): T;
declare function g<T = typeof g>(args: T): T;
declare function h<T>(): typeof h<T>;
