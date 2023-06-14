// @module: esnext
// @filename: mod.ts
const a = 1;
export { a }

// @filename: index.ts
export { "non-ident" };

// @filename: index2.ts
import { "a" as "b" } from "./mod";
