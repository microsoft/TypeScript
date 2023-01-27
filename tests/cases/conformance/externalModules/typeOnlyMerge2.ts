// @Filename: a.ts
const A = {}
export { A };

// @Filename: b.ts
import { A } from "./a";
type A = any;
export type { A };

// @Filename: c.ts
import { A } from "./b";
namespace A {}
export { A };

// @Filename: d.ts
import { A } from "./c";
A;
