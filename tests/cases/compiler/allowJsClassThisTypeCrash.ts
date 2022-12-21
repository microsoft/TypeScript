// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: app.js
const f = function() {};
var g = f;
g.prototype.m = function () {
  this;
};