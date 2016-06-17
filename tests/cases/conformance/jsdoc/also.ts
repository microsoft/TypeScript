// @allowJs: true
// @filename: also.js
// @out: dummy10.js
/** @class */
function Asset() {
    this._name = '';
    this._shape = '';
    this._shhhhKeepThisSecret = '';
}

/**
 *
 * Set the value of the name property.
 * @param {string} newName
 *
 *//**
 *
 * Get the value of the name property.
 * @returns {string}
 *
 */
Asset.prototype.name = function(newName) {
    if (newName) { this._name = newName; }
    else { return this._name; }
};

/**
 * Set the value of the shape property.
 * @param {string} newShape
 *//**
 * Set the value of the shape property, plus some other property.
 * @param {string} newShape
 * @param {string} mysteryProperty
 *//**
 * Get the value of the shape property.
 * @returns {string}
 */
Asset.prototype.shape = function(newShape, mysteryProperty) {
    if (newShape && mysteryProperty) {
        this._shape = newShape;
        this._shhhhKeepThisSecret = mysteryProperty;
    }
    else if (newShape) {
        this._shape = newShape;
    }
    else {
        return this._shape;
    }
};
