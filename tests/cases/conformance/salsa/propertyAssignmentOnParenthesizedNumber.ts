// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: bug38934.js

var x = {};
// should not crash and also should not result in a property '0' on x.
x[(0)] = 1;
