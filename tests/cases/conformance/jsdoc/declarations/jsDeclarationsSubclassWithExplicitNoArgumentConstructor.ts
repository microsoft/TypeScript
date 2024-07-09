// @allowJs: true
// @checkJs: true
// @outDir: /out
// @lib: es6
// @declaration: true
// @filename: index.js
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