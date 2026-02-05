//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodInStaticFieldInit.ts] ////

//// [privateNameStaticMethodInStaticFieldInit.ts]
class C {
    static s = C.#method();
    static #method() { return 42; }
}

console.log(C.s);


//// [privateNameStaticMethodInStaticFieldInit.js]
"use strict";
class C {
    static s = C.#method();
    static #method() { return 42; }
}
console.log(C.s);
