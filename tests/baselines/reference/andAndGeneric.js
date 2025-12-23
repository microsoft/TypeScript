//// [tests/cases/compiler/andAndGeneric.ts] ////

//// [andAndGeneric.ts]
declare function id<T>(x: T): T;

function f<T>(x: T) {
    return id(x && x);  // should NOT be narrowed to NonNullable<T>
}

// ---- expected types ----
const t1 = f(null);      // null  (currently incorrectly NonNullable<null> -> never)
const t2 = f(0);         // 0
const t3 = f(1);         // 1
const t4 = f<"a" | null>("a");  // "a"
const t5 = f<"a" | null>(null); // null


//// [andAndGeneric.js]
"use strict";
function f(x) {
    return id(x && x); // should NOT be narrowed to NonNullable<T>
}
// ---- expected types ----
var t1 = f(null); // null  (currently incorrectly NonNullable<null> -> never)
var t2 = f(0); // 0
var t3 = f(1); // 1
var t4 = f("a"); // "a"
var t5 = f(null); // null
