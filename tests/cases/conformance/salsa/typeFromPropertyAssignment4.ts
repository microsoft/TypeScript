// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
var Common = {};
Common.Outer = class {
    constructor() {
        /** @type {number} */
        this.y = 12
    }
}

/** @type {Common.Outer} */
var x;
x.y
