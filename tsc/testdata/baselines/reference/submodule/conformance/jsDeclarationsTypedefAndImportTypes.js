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
"use strict";
/**
 * @typedef {string | number} Whatever
 */
class Conn {
    constructor() {
        this.item = 3;
    }
    method() { }
}
module.exports = Conn;
//// [usage.js]
"use strict";
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
export = Conn;
export type Whatever = string | number;
declare class Conn {
    constructor();
    item: number;
    method(): void;
}
//// [usage.d.ts]
/**
 * @typedef {import("./conn")} Conn
 */
declare const _exports: {
    Wrap: typeof Wrap;
};
export = _exports;
export type Conn = import("./conn");
declare class Wrap {
    connItem: number;
    /** @type {import("./conn").Whatever} */
    another: import("./conn").Whatever;
    /**
     * @param {Conn} c
     */
    constructor(c: Conn);
}
