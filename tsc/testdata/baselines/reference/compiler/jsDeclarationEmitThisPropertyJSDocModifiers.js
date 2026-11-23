//// [tests/cases/compiler/jsDeclarationEmitThisPropertyJSDocModifiers.ts] ////

//// [a.js]
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




//// [a.d.ts]
export declare class A {
    /** @private @type {boolean} */
    private privateProperty;
    /** @protected @type {string} */
    protected protectedProperty: string;
    /** @readonly @type {number} */
    readonly readonlyProperty: number;
    /** @public @type {bigint} */
    publicProperty: bigint;
    /** @private @type {symbol} */
    private static privateStaticProperty;
    constructor();
    static initialize(): void;
}
