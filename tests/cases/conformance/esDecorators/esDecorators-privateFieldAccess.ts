// @target: esnext
// @noEmitHelpers: true

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
