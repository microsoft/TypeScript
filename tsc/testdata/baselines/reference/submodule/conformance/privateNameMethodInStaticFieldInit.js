//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodInStaticFieldInit.ts] ////

//// [privateNameMethodInStaticFieldInit.ts]
class C {
    static s = new C().#method();
    #method() { return 42; }
}

console.log(C.s);


//// [privateNameMethodInStaticFieldInit.js]
"use strict";
class C {
    static s = new C().#method();
    #method() { return 42; }
}
console.log(C.s);
