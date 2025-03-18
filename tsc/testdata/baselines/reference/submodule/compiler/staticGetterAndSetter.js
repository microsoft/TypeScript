//// [tests/cases/compiler/staticGetterAndSetter.ts] ////

//// [staticGetterAndSetter.ts]
class Foo {
    static get Foo():number { return 0; }
    static set Foo(n: number) {}
}


//// [staticGetterAndSetter.js]
class Foo {
    static get Foo() { return 0; }
    static set Foo(n) { }
}
