// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: chrome-devtools-DOMExtension.js

// Extend that DOM!
Event.prototype.removeChildren = function () {
    this.textContent = 'nope, not going to happen'
}
