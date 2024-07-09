// @Filename: /a.ts
export class A {}

// @Filename: /b.ts
export type * as ns from "./a";

// @Filename: /c.ts
import { ns } from "./b";
let _: ns.A = new ns.A(); // Error