// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.ts
export enum E { A }

// @Filename: /b.js
import { E } from "./a";
/** @type {E} */
const e = E.A;
