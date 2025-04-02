// @strict: true
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: index.js

Element.prototype.remove ??= function () {
  this.parentNode?.removeChild(this);
};

/**
 * @this Node
 */
Element.prototype.remove ??= function () {
  this.parentNode?.removeChild(this);
};
