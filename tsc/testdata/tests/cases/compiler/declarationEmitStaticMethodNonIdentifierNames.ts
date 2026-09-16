// @declaration: true
// @target: esnext

declare const uniqueSym: unique symbol;

// none of these names can be written as `typeof Foo.<name>`
export class Foo {
    static #priv() { }
    static getPriv() {
        return Foo.#priv;
    }

    static "quoted-name"() { }
    static getQuoted() {
        return Foo["quoted-name"];
    }

    static ["computed-name"]() { }
    static getComputed() {
        return Foo["computed-name"];
    }

    static 1() { }
    static getNumeric() {
        return Foo[1];
    }

    static [uniqueSym]() { }
    static getUnique() {
        return Foo[uniqueSym];
    }

    // property types go through the same path
    static privRef = Foo.#priv;
}

// identifier names still use `typeof`
export class Writable {
    static normalName() { }
    static getNormal() {
        return Writable.normalName;
    }

    static $dollar() { }
    static getDollar() {
        return Writable.$dollar;
    }
}

export class Generic {
    static #priv<T>(x: T): T { return x; }
    static getPriv() {
        return Generic.#priv;
    }
}

export class Recursive {
    static #rec() { return Recursive.#rec; }
    static getRec() {
        return Recursive.#rec;
    }
}

// instance members already fall back to a structural type
export class Instance {
    #priv() { }
    getPriv() {
        return this.#priv;
    }
}
