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

//// [foo.js]
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


//// [foo.d.ts]
declare function F(): void;
declare class F {
    /** @readonly */
    readonly z: number;
}
declare class C {
    /** @readonly */
    constructor(n: any);
    /** @readonly */
    readonly x: 6;
    /**
     * @readonly
     * @type {number}
     */
    readonly y: number;
}
declare class D {
    constructor(x: any);
}
