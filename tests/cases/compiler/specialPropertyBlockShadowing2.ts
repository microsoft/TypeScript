// @strict: true
// @allowJs: true
// @checkJs: true
// @outDir: dist
// @declaration: true
// @emitDeclarationOnly: true

// @filename: src/index.js

export function X() { };
if (Math.random()) {
  const X = function () { };
  X.prototype.method = function () { this.test = 1 };
}

export function Y() { };
Y.prototype.method = function () { this.test = "foo" };
const AliasTopY = Y;
if (Math.random()) {
  const Y = function () { };
  Y.prototype.method = function () { this.test = 42 };

  /** @type {{ test: string }} */
  const topYcheck = new AliasTopY();
  /** @type {{ test: number }} */
  const blockYcheck = new Y();
}
