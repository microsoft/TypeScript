// @noEmit: true
// @allowJs: true
// @checkJs: true

// #24131
// @Filename: a.js
const a = {};
a.d = function() {};
// @Filename: b.js
a.d.prototype = {};
