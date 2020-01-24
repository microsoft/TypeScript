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
