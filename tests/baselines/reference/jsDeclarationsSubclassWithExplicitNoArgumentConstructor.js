//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsSubclassWithExplicitNoArgumentConstructor.ts] ////

//// [index.js]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg, secondArg) { }
}

export class Sub extends Super {
    constructor() {
        super('first', 'second');
    }
}

//// [index.js]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg, secondArg) { }
}
export class Sub extends Super {
    constructor() {
        super('first', 'second');
    }
}


//// [index.d.ts]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg: string, secondArg: string);
}
export class Sub extends Super {
    constructor();
}
