// @target: es5,es2015,esnext
// @sourcemap: true

// @filename: identifierVariableWithEscape1.ts
export let \u0078 = 10;
x++;

// @filename: identifierVariableWithEscape2.ts
export let x\u0078 = 10;
xx++;

// @filename: identifierVariableWithEscape3.ts
export let a\u0062c\u0064e = 10;
abcde++;

// @filename: identifierVariableWithExtendedEscape1.ts
export let \u{78} = 10;
x++;

// @filename: identifierVariableWithExtendedEscape2.ts
export let x\u{78} = 10;
xx++;

// @filename: identifierVariableWithExtendedEscape3.ts
export let a\u{62}c\u{64}e = 10;
abcde++;

// @filename: IdentifierNameWithEscape1.ts
export class IdentifierNameWithEscape1 {
    \u0078: number;

    constructor() {
        this.\u0078 = 0;
    }

    doThing() {
        this.x = 42;
    }
}

// @filename: IdentifierNameWithEscape2.ts
export class IdentifierNameWithEscape2 {
    x\u0078: number;

    constructor() {
        this.x\u0078 = 0;
    }

    doThing() {
        this.xx = 42;
    }
}

// @filename: IdentifierNameWithEscape3.ts
export class IdentifierNameWithEscape3 {
    a\u0062c\u0064e: number;

    constructor() {
        this.a\u0062c\u0064e = 0;
    }

    doThing() {
        this.abcde = 42;
    }
}

// @filename: IdentifierNameWithExtendedEscape1.ts
export class IdentifierNameWithExtendedEscape1 {
    \u{78}: number;

    constructor() {
        this.\u{78} = 0;
    }

    doThing() {
        this.x = 42;
    }
}

// @filename: IdentifierNameWithExtendedEscape2.ts
export class IdentifierNameWithExtendedEscape2 {
    x\u{78}: number;

    constructor() {
        this.x\u{78} = 0;
    }

    doThing() {
        this.xx = 42;
    }
}

// @filename: IdentifierNameWithExtendedEscape3.ts
export class IdentifierNameWithExtendedEscape3 {
    a\u{62}c\u{64}e: number;

    constructor() {
        this.a\u{62}c\u{64}e = 0;
    }

    doThing() {
        this.abcde = 42;
    }
}

// @filename: PrivateIdentifierNameWithEscape1.ts
export class PrivateIdentifierWithEscape1 {
    #\u0078: number;

    constructor() {
        this.#\u0078 = 0;
    }

    doThing() {
        this.#x = 42;
    }
}

// @filename: PrivateIdentifierNameWithEscape2.ts
export class PrivateIdentifierWithEscape2 {
    #x\u0078: number;

    constructor() {
        this.#x\u0078 = 0;
    }

    doThing() {
        this.#xx = 42;
    }
}

// @filename: PrivateIdentifierNameWithEscape3.ts
export class PrivateIdentifierWithEscape3 {
    #a\u0062c\u0064e: number;

    constructor() {
        this.#a\u0062c\u0064e = 0;
    }

    doThing() {
        this.#abcde = 42;
    }
}

// @filename: PrivateIdentifierNameWithExtendedEscape1.ts
export class PrivateIdentifierWithExtendedEscape1 {
    #\u{78}: number;

    constructor() {
        this.#\u{78} = 0;
    }

    doThing() {
        this.#x = 42;
    }
}

// @filename: PrivateIdentifierNameWithExtendedEscape2.ts
export class PrivateIdentifierWithExtendedEscape2 {
    #x\u{78}: number;

    constructor() {
        this.#x\u{78} = 0;
    }

    doThing() {
        this.#xx = 42;
    }
}

// @filename: PrivateIdentifierNameWithExtendedEscape3.ts
export class PrivateIdentifierWithExtendedEscape3 {
    #a\u{62}c\u{64}e: number;

    constructor() {
        this.#a\u{62}c\u{64}e = 0;
    }

    doThing() {
        this.#abcde = 42;
    }
}
