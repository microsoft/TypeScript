//// [tests/cases/compiler/declarationEmitStaticMethodNonIdentifierNames.ts] ////

//// [declarationEmitStaticMethodNonIdentifierNames.ts]
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


//// [declarationEmitStaticMethodNonIdentifierNames.js]
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
    static #priv(x) { return x; }
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


//// [declarationEmitStaticMethodNonIdentifierNames.d.ts]
declare const uniqueSym: unique symbol;
export declare class Foo {
    #private;
    static getPriv(): () => void;
    static "quoted-name"(): void;
    static getQuoted(): () => void;
    static ["computed-name"](): void;
    static getComputed(): () => void;
    static 1(): void;
    static getNumeric(): () => void;
    static [uniqueSym](): void;
    static getUnique(): () => void;
    static privRef: () => void;
}
export declare class Writable {
    static normalName(): void;
    static getNormal(): typeof Writable.normalName;
    static $dollar(): void;
    static getDollar(): typeof Writable.$dollar;
}
export declare class Generic {
    #private;
    static getPriv(): <T>(x: T) => T;
}
export declare class Recursive {
    #private;
    static getRec(): () => /*elided*/ any;
}
export declare class Instance {
    #private;
    getPriv(): () => void;
}
export {};
