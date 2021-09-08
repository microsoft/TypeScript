// @preserveValueImports: true
// @isolatedModules: true,false
// @module: esnext

// @Filename: a.ts
export type A = {};
export type { A as default };

// @Filename: b.ts
class B {};
export type { B, B as default };

// @Filename: c.ts
import DefaultA from "./a";
import { A } from "./a";
import DefaultB from "./b";
import { B } from "./b";

// @Filename: c.fixed.ts
import type DefaultA from "./a";
import type { A } from "./a";
import type DefaultB from "./b";
import type { B } from "./b";

// @Filename: d.ts
export { A as AA } from "./a";
export { B as BB } from "./b";

// @Filename: d.fixed.ts
export type { A as AA } from "./a";
export type { B as BB } from "./b";

// @Filename: e.ts
import { AA, BB } from "./d";

// @Filename: e.fixed.ts
import type { AA, BB } from "./d";

// @Filename: f.ts
import type { A } from "./a";
import type { B } from "./b";
export { A, B as BB };

// @Filename: f.fixed.ts
import type { A } from "./a";
import type { B } from "./b";
export type { A, B as BB };
