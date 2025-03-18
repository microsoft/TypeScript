//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodInStaticFieldInit.ts] ////

//// [privateNameMethodInStaticFieldInit.ts]
class C {
    static s = new C().#method();
    #method() { return 42; }
}

console.log(C.s);


//// [privateNameMethodInStaticFieldInit.js]
class C {
    static s = new C().#method();
    #method() { return 42; }
}
console.log(C.s);
