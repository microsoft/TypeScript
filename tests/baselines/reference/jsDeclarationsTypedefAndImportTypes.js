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
    }
    return Wrap;
}());
module.exports = {
    Wrap: Wrap
};


//// [conn.d.ts]
declare class Conn {
    item: number;
    method(): void;
}
export = Conn;
declare namespace Conn {
    export type Whatever = string | number;
}
//// [usage.d.ts]
declare class Wrap {
    constructor(c: import("./conn"));
    connItem: number;
}
declare const _exports: {
    Wrap: typeof Wrap;
};
export = _exports;
declare namespace _exports {
    export type Conn = import("./conn");
}
