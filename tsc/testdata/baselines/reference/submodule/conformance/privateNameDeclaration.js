//// [tests/cases/conformance/classes/members/privateNames/privateNameDeclaration.ts] ////

//// [privateNameDeclaration.ts]
class A {
    #foo: string;
    #bar = 6;
    baz: string;
    qux = 6;
    quux(): void {

    }
}


//// [privateNameDeclaration.js]
class A {
    #foo;
    #bar = 6;
    baz;
    qux = 6;
    quux() {
    }
}
