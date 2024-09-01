// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
export class A {
  static a() {}
}

// @filename: b.js
import { A } from "./a";

/**
 * @extends A
 */
export class B extends A {
  static {
    B.a();
  }
}