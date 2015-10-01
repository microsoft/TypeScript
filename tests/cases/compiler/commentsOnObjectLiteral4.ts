// @removeComments: false
// @target: ES5

var v = {
 /**
  * @type {number}
  */
 get bar(): number {
  return this._bar;
 }
}