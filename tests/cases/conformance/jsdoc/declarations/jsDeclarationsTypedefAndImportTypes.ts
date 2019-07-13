// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: conn.js

class Conn {
    constructor() {}
    item = 3;
    method() {}
}

module.exports = Conn;

// @filename: usage.js

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
