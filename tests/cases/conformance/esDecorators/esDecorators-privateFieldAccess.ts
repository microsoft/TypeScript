// @target: esnext
// @noEmitHelpers: true

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
