//// [tests/cases/compiler/missingReturnStatement1.ts] ////

//// [missingReturnStatement1.ts]
class Foo {
    foo(): number {
        //return 4;
    }
}


//// [missingReturnStatement1.js]
class Foo {
    foo() {
    }
}
