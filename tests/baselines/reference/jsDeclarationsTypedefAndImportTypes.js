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
var Conn = /** @class */ (function () {
    function Conn() {
        this.item = 3;
    }
    Conn.prototype.method = function () { };
    return Conn;
}());
module.exports = Conn;
//// [usage.js]
/**
 * @typedef {import("./conn")} Conn
 */
var Wrap = /** @class */ (function () {
    /**
     * @param {Conn} c
     */
    function Wrap(c) {
        this.connItem = c.item;
        /** @type {import("./conn").Whatever} */
        this.another = "";
    }
    return Wrap;
}());
module.exports = {
    Wrap: Wrap
};


//// [conn.d.ts]
export = Conn;
/**
 * @typedef {string | number} Whatever
 */
declare class Conn {
    item: number;
    method(): void;
}
declare namespace Conn {
    export { Whatever };
}
type Whatever = string | number;
//// [usage.d.ts]
export type Conn = import("./conn");
/**
 * @typedef {import("./conn")} Conn
 */
export class Wrap {
    /**
     * @param {Conn} c
     */
    constructor(c: Conn);
    connItem: number;
    /** @type {import("./conn").Whatever} */
    another: import("./conn").Whatever;
}
