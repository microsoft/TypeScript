// @declaration: true
// @target: esnext

export class Foo {
    static #bar() { }

    // inferred return type must not be `typeof Foo.#bar`
    static getBar() {
        return Foo.#bar;
    }

    static #baz<T>(x: T): T { return x; }

    static getBaz() {
        return Foo.#baz;
    }

    // inferred property type must not be `typeof Foo.#bar`
    static barRef = Foo.#bar;
}

export class Recursive {
    static #rec() { return Recursive.#rec; }

    static getRec() {
        return Recursive.#rec;
    }
}

// instance private methods already fall back to a structural type
export class Instance {
    #bar() { }

    getBar() {
        return this.#bar;
    }
}
