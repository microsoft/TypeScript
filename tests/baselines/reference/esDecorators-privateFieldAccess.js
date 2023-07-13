//// [tests/cases/conformance/esDecorators/esDecorators-privateFieldAccess.ts] ////

//// [esDecorators-privateFieldAccess.ts]
declare let dec: any;

@dec(x => x.#foo) // error
class A {
    #foo = 3;

    @dec(this, (x: A) => x.#foo) // ok
    m() {}
}

@dec((x: B) => x.#foo) // error
class B {
    #foo = 3;
}

class C {
    #foo = 2;
    m() {
        @dec(() => this.#foo) // ok
        class D {}
        return D;
    }
}


//// [esDecorators-privateFieldAccess.js]
@dec(x => x.#foo) // error
class A {
    #foo = 3;
    @dec(this, (x) => x.#foo) // ok
    m() { }
}
@dec((x) => x.#foo) // error
class B {
    #foo = 3;
}
class C {
    #foo = 2;
    m() {
        @dec(() => this.#foo) // ok
        class D {
        }
        return D;
    }
}
