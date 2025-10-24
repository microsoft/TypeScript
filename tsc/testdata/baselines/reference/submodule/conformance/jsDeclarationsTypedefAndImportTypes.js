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
Object.defineProperty(exports, "__esModule", { value: true });
class Conn {
    constructor() { }
    item = 3;
    method() { }
}
export = Conn;
module.exports = Conn;
//// [usage.js]
"use strict";
/**
 * @typedef {import("./conn")} Conn
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
