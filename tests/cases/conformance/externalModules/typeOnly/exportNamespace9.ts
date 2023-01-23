// @Filename: /a.ts
export type A = number;

// @Filename: /b.ts
export type * from "./a";

// @Filename: /c.ts
import { A } from "./b";
const A = 1;
export { A };

// @Filename: /d.ts
import { A } from "./c";
A; // Ok
type _ = A;

// @Filename: /e.ts
export const A = 1;

// @Filename: /f.ts
export * from "./e";
export type * from "./a"; // Collision error

// @Filename: /g.ts
import { A } from "./f";
A;
type _ = A; // Follow-on from collision error
