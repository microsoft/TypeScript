// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: globalThisPropertyAssignment.js
this.x = 1
var y = 2
// should work in JS
window.z = 3
// should work in JS (even though it's a secondary declaration)
globalThis.alpha = 4
