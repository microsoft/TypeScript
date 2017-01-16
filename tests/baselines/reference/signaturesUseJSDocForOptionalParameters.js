//// [jsDocOptionality.js]
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


//// [out_1.js]
function MyClass() {
    this.prop = null;
}
/**
 * @param  {string} required
 * @param  {string} [notRequired]
 * @returns {MyClass}
 */
MyClass.prototype.optionalParam = function (required, notRequired) {
    return this;
};
var pInst = new MyClass();
var c1 = pInst.optionalParam('hello');
var c2 = pInst.optionalParam('hello', null);
