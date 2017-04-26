// @allowJs: true
// @noEmit: true

// @filename: foo.js
module.exports = function () {
  class A { }
  return {
    c: A.b = 1,
  }
};
