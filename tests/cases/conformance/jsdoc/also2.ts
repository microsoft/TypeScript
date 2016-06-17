// @allowJs: true
// @filename: also2.js
// @out: dummy11.js
/** @class */
function BowlingAlley() {
    this._lanes = 0;
}

/**
 * Add a lane to the bowling alley.
 * @also
 * Add the specified number of lanes to the bowling alley.
 * @param {number} [lanes=1] - The number of lanes to add.
 */
BowlingAlley.prototype.addLanes = function addLanes(lanes) {
    this._lanes += (typeof lanes === undefined) ? 1 : lanes;
};
