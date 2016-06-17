// @allowJs: true
// @filename: abstracttag.js
// @out: dummy0.js
/** @constructor */
function Thingy() {

    /** @abstract */
    this.pez = 2;

}

// same as...

/** @constructor */
function OtherThingy() {

    /** @virtual */
    this.pez = 2;

}