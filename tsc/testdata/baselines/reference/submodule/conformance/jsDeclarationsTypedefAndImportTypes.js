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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {string | number} Whatever
 */
class Conn {
    constructor() { }
    item = 3;
    method() { }
}
export = Conn;
module.exports = Conn;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
export type Whatever = string | number;
export = Conn;
//// [usage.d.ts]
export type Conn = import("./conn");
/**
 * @typedef {import("./conn")} Conn
 */
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
