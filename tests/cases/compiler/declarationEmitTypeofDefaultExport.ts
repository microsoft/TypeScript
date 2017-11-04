// @declaration: true
// @filename: /a.ts
export default class C {};

// @filename: /b.ts
import * as a from "./a";
export default a.default;
