// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /test.js
class Abcde {
  /** @type {string} */
  x;
}

module.exports = {
  Abcde
};

// @Filename: /index.ts
import { Abcde } from "./test";

declare module "./test" {
  interface Abcde { b: string }
}

new Abcde().x;

// Bug: the type meaning from /test.js does not
// propagate through the object literal export.
const x: Abcde = { b: "" };
