// @allowJs: true
// @checkJs: false
// @noEmit: true
// @Filename: /a.js

function Graphic() {
}

Object.defineProperty(Graphic.prototype, "instance", {
  get: function() {
    return this;
  }
});

