//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodDeclarationEmit.ts] ////

//// [privateNameStaticMethodDeclarationEmit.ts]
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


//// [privateNameStaticMethodDeclarationEmit.js]
export class Foo {
    static #bar() { }
    // inferred return type must not be `typeof Foo.#bar`
    static getBar() {
        return Foo.#bar;
    }
    static #baz(x) { return x; }
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


//// [privateNameStaticMethodDeclarationEmit.d.ts]
export declare class Foo {
    #private;
    static getBar(): () => void;
    static getBaz(): <T>(x: T) => T;
    static barRef: () => void;
}
export declare class Recursive {
    #private;
    static getRec(): () => /*elided*/ any;
}
export declare class Instance {
    #private;
    getBar(): () => void;
}
