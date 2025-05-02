// @strict: true
// @noEmit: true

Element.prototype.remove ??= function () {
  this.parentNode?.removeChild(this);
};
