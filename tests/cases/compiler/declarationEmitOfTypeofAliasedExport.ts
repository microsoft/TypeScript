// @declaration: true
// @filename: /a.ts
class C {}
export { C as D }

// @filename: /b.ts
import * as a from "./a";
export default a.D;
