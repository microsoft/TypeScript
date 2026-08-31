// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: a.ts
export class A {
    /** Public property. */
    a = 1;

    /** Private property. */
    private b = 1;

    /** Private method. */
    private c() {}

    /** Private getter. */
    private get d() { return 1; }

    /** Private setter. */
    private set d(value: number) {}

    /** ECMAScript private property. */
    #e = 1;

    constructor(
        /** Private parameter property. */
        private f: number,
    ) {}
}

// @filename: b.js
export class B {
    /** Public property. */
    a = 1;

    /** @private */
    b = 1;

    /** @private */
    c() {}

    /** @private */
    get d() { return 1; }

    /** @private */
    set d(value) {}

    /** ECMAScript private property. */
    #e = 1;
}
