//// [jsdocAccessibilityTagDeclarations.js]
class Protected {
    /** @protected */
    constructor(c) {
        /** @protected */
        this.c = c
    }
    /** @protected */
    m() {
        return this.c
    }
    /** @protected */
    get p() { return this.c }
    /** @protected */
    set p(value) { this.c = value }
}

class Private {
    /** @private */
    constructor(c) {
        /** @private */
        this.c = c
    }
    /** @private */
    m() {
        return this.c
    }
    /** @private */
    get p() { return this.c }
    /** @private */
    set p(value) { this.c = value }
}


//// [foo.js]
class Protected {
    /** @protected */
    constructor(c) {
        /** @protected */
        this.c = c;
    }
    /** @protected */
    m() {
        return this.c;
    }
    /** @protected */
    get p() { return this.c; }
    /** @protected */
    set p(value) { this.c = value; }
}
class Private {
    /** @private */
    constructor(c) {
        /** @private */
        this.c = c;
    }
    /** @private */
    m() {
        return this.c;
    }
    /** @private */
    get p() { return this.c; }
    /** @private */
    set p(value) { this.c = value; }
}


//// [foo.d.ts]
declare class Protected {
    /** @protected */
    protected constructor();
    /** @protected */
    protected c: any;
    /** @protected */
    protected m(): any;
    /** @protected */
    protected set p(arg: any);
    /** @protected */
    protected get p(): any;
}
declare class Private {
    /** @private */
    private constructor();
    /** @private */
    private c;
    /** @private */
    private m;
    /** @private */
    private set p(arg);
    /** @private */
    private get p();
}
