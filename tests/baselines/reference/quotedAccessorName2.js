//// [tests/cases/compiler/quotedAccessorName2.ts] ////

//// [quotedAccessorName2.ts]
class C {
    static get "foo"() { return 0; }
}

//// [quotedAccessorName2.js]
class C {
    static get "foo"() { return 0; }
}
