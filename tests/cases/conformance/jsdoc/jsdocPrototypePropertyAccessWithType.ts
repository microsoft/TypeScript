// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
function C() { this.x = false; };
/** @type {number} */
C.prototype.x;
new C().x;
