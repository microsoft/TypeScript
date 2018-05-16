'use strict';

/**
 * Expose `Progress`.
 */

module.exports = Progress;

/**
 * Initialize a new `Progress` indicator.
 */
function Progress () {
  this.percent = 0;
  this.size(0);
  this.fontSize(11);
  this.font('helvetica, arial, sans-serif');
}

/**
 * Set progress size to `size`.
 *
 * @api public
 * @param {number} size
 * @return {Progress} Progress instance.
 */
Progress.prototype.size = function (size) {
  this._size = size;
  return this;
};

/**
 * Set text to `text`.
 *
 * @api public
 * @param {string} text
 * @return {Progress} Progress instance.
 */
Progress.prototype.text = function (text) {
  this._text = text;
  return this;
};

/**
 * Set font size to `size`.
 *
 * @api public
 * @param {number} size
 * @return {Progress} Progress instance.
 */
Progress.prototype.fontSize = function (size) {
  this._fontSize = size;
  return this;
};

/**
 * Set font to `family`.
 *
 * @param {string} family
 * @return {Progress} Progress instance.
 */
Progress.prototype.font = function (family) {
  this._font = family;
  return this;
};

/**
 * Update percentage to `n`.
 *
 * @param {number} n
 * @return {Progress} Progress instance.
 */
Progress.prototype.update = function (n) {
  this.percent = n;
  return this;
};

/**
 * Draw on `ctx`.
 *
 * @param {CanvasRenderingContext2d} ctx
 * @return {Progress} Progress instance.
 */
Progress.prototype.draw = function (ctx) {
  try {
    var percent = Math.min(this.percent, 100);
    var size = this._size;
    var half = size / 2;
    var x = half;
    var y = half;
    var rad = half - 1;
    var fontSize = this._fontSize;

    ctx.font = fontSize + 'px ' + this._font;

    var angle = Math.PI * 2 * (percent / 100);
    ctx.clearRect(0, 0, size, size);

    // outer circle
    ctx.strokeStyle = '#9f9f9f';
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, angle, false);
    ctx.stroke();

    // inner circle
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.arc(x, y, rad - 1, 0, angle, true);
    ctx.stroke();

    // text
    var text = this._text || (percent | 0) + '%';
    var w = ctx.measureText(text).width;

    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
  } catch (err) {
    // don't fail if we can't render progress
  }
  return this;
};
