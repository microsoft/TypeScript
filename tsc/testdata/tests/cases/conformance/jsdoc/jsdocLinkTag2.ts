// @noUnusedLocals: true
// @checkJs: true
// @allowJs: true
// @target: esnext
// @noEmit: true

// @filename: /a.js
export class A {}

// @filename: /b.js
import { A } from "./a";

/** {@link A} */
export class B {}

