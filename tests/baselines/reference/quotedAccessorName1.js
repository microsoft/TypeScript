//// [tests/cases/compiler/quotedAccessorName1.ts] ////

//// [quotedAccessorName1.ts]
class C {
    get "foo"() { return 0; }
}

//// [quotedAccessorName1.js]
class C {
    get "foo"() { return 0; }
}
