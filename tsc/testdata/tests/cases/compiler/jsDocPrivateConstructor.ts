// @checkJs: true
// @noEmit: true
// @filename: main.js

// https://github.com/microsoft/typescript-go/issues/4219

class C {
  /** @private */
  constructor() {}
}
new C();
