//// [tests/cases/conformance/jsdoc/jsdocAccessibilityTagsDeclarations.ts] ////

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

// https://github.com/microsoft/TypeScript/issues/38401
class C {
    constructor(/** @public */ x, /** @protected */ y, /** @private */ z) {
    }
}


//// [jsdocAccessibilityTagDeclarations.js]
"use strict";
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
// https://github.com/microsoft/TypeScript/issues/38401
class C {
    constructor(/** @public */ x, /** @protected */ y, /** @private */ z) {
    }
}


//// [jsdocAccessibilityTagDeclarations.d.ts]
declare class Protected {
    /** @protected */
    c: any;
    /** @protected */
    protected constructor(c: any);
    /** @protected */
    protected m(): any;
    /** @protected */
    protected get p(): any;
    /** @protected */
    protected set p(value: any);
}
declare class Private {
    /** @private */
    c;
    /** @private */
    private constructor();
    private m;
    private get p();
    private set p(value);
}
declare class C {
    constructor(/** @public */ x: any, /** @protected */ y: any, /** @private */ z: any);
}
