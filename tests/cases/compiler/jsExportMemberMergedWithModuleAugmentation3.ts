// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /x.js
module.exports.x = 1;
module.exports = require("./y.js");

// @Filename: /y.d.ts
export declare type x = 1;
