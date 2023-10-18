//// [tests/cases/conformance/classes/members/privateNames/privateNamesNotAllowedAsParameters.ts] ////

//// [privateNamesNotAllowedAsParameters.ts]
class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
class A {
    setFoo(#foo) { }
}
