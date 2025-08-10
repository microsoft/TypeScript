// @strict: true
// @allowJs: true
// @checkJs: true
// @outDir: dist
// @declaration: true
// @emitDeclarationOnly: true

// @filename: src/index.js

export function X() {}
if (Math.random()) {
  const X = function() {}
  Object.defineProperty(X.prototype, "test", { value: 1 });
}

export function Y() {}
Object.defineProperty(Y.prototype, "test", { value: "foo" });
const AliasTopY = Y;
if (Math.random()) {
  const Y = function Y() {}
  Object.defineProperty(Y.prototype, "test", { value: 42 });

  /** @type {{ test: string }} */
  const topYcheck = new AliasTopY();
  /** @type {{ test: number }} */
  const blockYcheck = new Y();
}
