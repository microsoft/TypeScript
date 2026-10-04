//// [tests/cases/conformance/jsdoc/jsdocReadonlyDeclarations.ts] ////

//// [jsdocReadonlyDeclarations.js]
class C {
    /** @readonly */
    x = 6
    /** @readonly */
    constructor(n) {
        this.x = n
        /**
         * @readonly
         * @type {number}
         */
        this.y = n
    }
}
new C().x

function F() {
    /** @readonly */
    this.z = 1
}

// https://github.com/microsoft/TypeScript/issues/38401
class D {
    constructor(/** @readonly */ x) {}
}


//// [jsdocReadonlyDeclarations.js]
"use strict";
class C {
    /** @readonly */
    constructor(n) {
        /** @readonly */
        this.x = 6;
        this.x = n;
        /**
         * @readonly
         * @type {number}
         */
        this.y = n;
    }
}
new C().x;
function F() {
    /** @readonly */
    this.z = 1;
}
// https://github.com/microsoft/TypeScript/issues/38401
class D {
    constructor(/** @readonly */ x) { }
}


//// [jsdocReadonlyDeclarations.d.ts]
declare class C {
    /**
     * @readonly
     * @type {number}
     */
    y: number;
    /** @readonly */
    readonly x = 6;
    /** @readonly */
    readonly constructor(n: any);
}
declare function F(): void;
declare class D {
    constructor(/** @readonly */ x: any);
}
