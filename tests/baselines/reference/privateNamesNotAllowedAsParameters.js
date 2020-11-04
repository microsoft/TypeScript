//// [privateNamesNotAllowedAsParameters.ts]
class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
class A {
    setFoo(#foo) { }
}
