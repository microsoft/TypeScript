// @module: preserve
// @target: esnext

// @Filename: /a.ts
export class A {}

// @Filename: /b.ts
export = class B {}

// @Filename: /main.ts
import { A } from "./a";
import B = require("./b");
export { A, B };
