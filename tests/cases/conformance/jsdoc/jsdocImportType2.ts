// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: types.d.ts
declare function require(name: string): any;
declare var exports: any;
declare var module: { exports: any };
// @Filename: mod1.js
/// <reference path='./types.d.ts'/>
module.exports = class Chunk {
    constructor() {
        this.chunk = 1;
    }
}

// @Filename: use.js
/// <reference path='./types.d.ts'/>
/** @typedef {import("./mod1")} C
 * @type {C} */
var c;
c.chunk;

const D = require("./mod1");
/** @type {D} */
var d;
d.chunk;
