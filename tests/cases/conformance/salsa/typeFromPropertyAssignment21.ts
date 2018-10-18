// @allowJs: true
// @checkJs: true
// @noEmit: true
// @lib: dom, es5
// @Filename: chrome-devtools-DOMExtension.js

// Extend that DOM! (doesn't work, but shouldn't crash)
Event.prototype.removeChildren = function () {
    this.textContent = 'nope, not going to happen'
}
