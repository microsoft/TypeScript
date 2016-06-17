// @allowJs: true
// @filename: accesstag.js
// @out: dummy1.js
/** @constructor */
function Thingy() {

    /** @access private */
    var foo = 0;

    /** @access protected */
    this._bar = 1;

    /** @access public */
    this._gnu = 2;

    /** nothing */
    this.pez = 3;

}

// same as...

/** @constructor */
function OtherThingy() {

    /** @private */
    var foo = 0;

    /** @protected */
    this._bar = 1;

    /** @public */
    this._gnu = 2;

    /** nothing */
    this.pez = 3;

}