//// [tests/cases/conformance/esDecorators/esDecorators-privateFieldAccess.ts] ////

//// [esDecorators-privateFieldAccess.ts]
declare let dec: any;

@dec(x => x.#foo) // error
class Foo {
    #foo = 3;

    @dec(this, (x: Foo) => x.#foo) // ok
    m() {}
}


//// [esDecorators-privateFieldAccess.js]
@dec(x => x.#foo) // error
class Foo {
    #foo = 3;
    @dec(this, (x) => x.#foo) // ok
    m() { }
}
