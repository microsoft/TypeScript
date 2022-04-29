// @allowJs: true
// @out: out_1.js
// @filename: jsDocOptionality.js
function MyClass() {
  this.prop = null;
}
/**
 * @param  {string} required
 * @param  {string} [notRequired]
 * @returns {MyClass}
 */
MyClass.prototype.optionalParam = function(required, notRequired) {
    return this;
};
let pInst = new MyClass();
let c1 = pInst.optionalParam('hello')
let c2 = pInst.optionalParam('hello', null)
