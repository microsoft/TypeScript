/// <reference path='fourslash.ts'/>

//// type T = { p: string | number };
//// function f(t: T) {
////     if (typeof t.p === "string") {
////         t[/**/"p"];    // string, number
////     }
//// }

verify.quickInfoAt("", "(property) p: string");