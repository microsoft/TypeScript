// @target: esnext

type Foo = { foo?: string };

class C {
    #a?: Foo;
    #b?: Foo;

    m() {
        const a = this.#a || {};
        this.#b = this.#b || {};
    }
}
