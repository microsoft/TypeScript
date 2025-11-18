//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypedefAndImportTypes.ts] ////

//// [conn.js]
/**
 * @typedef {string | number} Whatever
 */

class Conn {
    constructor() {}
    item = 3;
    method() {}
}

module.exports = Conn;

//// [usage.js]
/**
 * @typedef {import("./conn")} Conn
 */

class Wrap {
    /**
     * @param {Conn} c
     */
    constructor(c) {
        this.connItem = c.item;
        /** @type {import("./conn").Whatever} */
        this.another = "";
    }
}

module.exports = {
    Wrap
};


//// [conn.js]
/**
 * @typedef {string | number} Whatever
 */
class Conn {
    constructor() { }
    item = 3;
    method() { }
}
module.exports = Conn;
//// [usage.js]
/**
 * @typedef {import("./conn")} Conn
 */
class Wrap {
    /**
     * @param {Conn} c
     */
    constructor(c) {
        this.connItem = c.item;
        /** @type {import("./conn").Whatever} */
        this.another = "";
    }
}
module.exports = {
    Wrap
};


//// [conn.d.ts]
/**
 * @typedef {string | number} Whatever
 */
export type Whatever = string | number;
export = Conn;
//// [usage.d.ts]
/**
 * @typedef {import("./conn")} Conn
 */
export type Conn = import("./conn");
declare class Wrap {
    /**
     * @param {Conn} c
     */
    constructor(c: Conn);
}
declare const _default: {
    Wrap: typeof Wrap;
};
export = _default;


//// [DtsFileErrors]


out/conn.d.ts(5,1): error TS2309: An export assignment cannot be used in a module with other exported elements.
out/conn.d.ts(5,10): error TS2304: Cannot find name 'Conn'.
out/usage.d.ts(4,20): error TS1340: Module './conn' does not refer to a type, but is used as a type here. Did you mean 'typeof import('./conn')'?
out/usage.d.ts(14,1): error TS2309: An export assignment cannot be used in a module with other exported elements.


==== out/conn.d.ts (2 errors) ====
    /**
     * @typedef {string | number} Whatever
     */
    export type Whatever = string | number;
    export = Conn;
    ~~~~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
             ~~~~
!!! error TS2304: Cannot find name 'Conn'.
    
==== out/usage.d.ts (2 errors) ====
    /**
     * @typedef {import("./conn")} Conn
     */
    export type Conn = import("./conn");
                       ~~~~~~~~~~~~~~~~
!!! error TS1340: Module './conn' does not refer to a type, but is used as a type here. Did you mean 'typeof import('./conn')'?
    declare class Wrap {
        /**
         * @param {Conn} c
         */
        constructor(c: Conn);
    }
    declare const _default: {
        Wrap: typeof Wrap;
    };
    export = _default;
    ~~~~~~~~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
    