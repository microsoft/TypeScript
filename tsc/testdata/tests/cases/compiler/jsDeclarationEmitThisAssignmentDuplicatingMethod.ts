// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @target: esnext
// @filename: main.js
export class A {
    constructor() {
        this.foo = this.foo.bind(this);
    }
    foo() {}
}

export class B {
    constructor() {
        this.#foo = this.#foo.bind(this);
    }
    #foo = () => {}
}

const sym = Symbol();
export class C {
    constructor() {
        this[sym] = this[sym].bind(this);
    }
    [sym]() {}
}

export class D {
    constructor() {
        this.bar = 1;
    }
    static bar() {}
}

export class E {
    static init() {
        this.baz = 1;
    }
    baz() {}
}

export class F {
    static #foo = () => {}
    static {
        this.#foo = this.#foo.bind(this);
    }
}

const sym2 = Symbol();
export class G {
    static {
        this[sym2] = this[sym2].bind(this);
    }
    static[sym2]() {}
}

export class H {
    static foo = () => {}
    static {
        this.foo = this.foo.bind(this);
    }
}
