//// [tests/cases/conformance/esDecorators/esDecorators-privateFieldAccess.ts] ////

//// [esDecorators-privateFieldAccess.ts]
declare let dec: any;

@dec(x => x.#foo) // error
class A {
    #foo = 3;

    @dec(this, (x: A) => x.#foo) // ok
    m() {}
}

class B {
    #foo = 2;
    m() {
        @dec(() => this.#foo) // ok
        class C {}
        return C;
    }
}


//// [esDecorators-privateFieldAccess.js]
@dec(x => x.#foo) // error
class A {
    #foo = 3;
    @dec(this, (x) => x.#foo) // ok
    m() { }
}
class B {
    #foo = 2;
    m() {
        @dec(() => this.#foo) // ok
        class C {
        }
        return C;
    }
}
