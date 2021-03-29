// @target: es2015

class C {
    #foo = 42;
    #bar() { new C().#baz; }
    get #baz() { return 42; }

    m() {
        return class D {
            #bar() {}
            constructor() {
                new C().#foo;
                new C().#bar; // Error
                new C().#baz;
                new D().#bar;
            }

            n(x: any) {
                x.#foo;
                x.#bar;
                x.#unknown; // Error
            }
        }
    }
}
