// @target: esnext
// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true
// @filename: /a.js

export class A {
    constructor() {
        /** @private @type {boolean} */
        this.privateProperty = false;
        /** @protected @type {string} */
        this.protectedProperty = "";
        /** @readonly @type {number} */
        this.readonlyProperty = 0;
        /** @public @type {bigint} */
        this.publicProperty = 0n;
    }

    static initialize() {
        /** @private @type {symbol} */
        this.privateStaticProperty = Symbol();
    }
}
