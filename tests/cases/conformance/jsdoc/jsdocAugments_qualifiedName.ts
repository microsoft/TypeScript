// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
export class A {}

// @Filename: /b.js
import * as a from "./a";
/** @augments a.A */
class B {}
