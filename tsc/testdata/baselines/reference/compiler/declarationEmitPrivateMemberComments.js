//// [tests/cases/compiler/declarationEmitPrivateMemberComments.ts] ////

//// [a.ts]
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

//// [b.js]
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

    constructor() {
        /** Public constructor property. */
        this.f = 1;

        /**
         * Protected constructor property.
         * @protected
         */
        this.g = 1;

        /**
         * Private constructor property.
         * @private
         */
        this.h = 1;
    }
}




//// [a.d.ts]
export declare class A {
    #private;
    private f;
    /** Public property. */
    a: number;
    private b;
    private c;
    private get d();
    private set d(value);
    constructor(
    /** Private parameter property. */
    f: number);
}
//// [b.d.ts]
export declare class B {
    #private;
    /** Public constructor property. */
    f: number;
    /**
     * Protected constructor property.
     * @protected
     */
    protected g: number;
    private h;
    /** Public property. */
    a: number;
    private b;
    private c;
    private get d();
    private set d(value);
    constructor();
}
