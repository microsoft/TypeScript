// @allowJs: true
// @checkJs: false
// @noEmit: true

// @fileName: a.js
// @ts-check

var CtorFunction = function() {
  this.myField = 'a';
};
/** @type {string} */
CtorFunction.prototype.myField;

var x = new CtorFunction();
x.myField = 'b';
