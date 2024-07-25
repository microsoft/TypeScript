// @Filename: a.ts
interface A {}
export type { A };

// @Filename: b.ts
import { A } from "./a";
const A = 0;
export { A };

// @Filename: c.ts
import { A } from "./b";
A;
