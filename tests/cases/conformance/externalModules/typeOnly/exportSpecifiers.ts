// @module: esnext
// @declaration: true

// @Filename: /imports.ts
import { type, as, something, foo, bar } from "./exports.js";
type;
as; // Error (used in emitting position)
something; // Error (used in emitting position)
foo; // Error (used in emitting position)
bar; // Error (used in emitting position)

// @Filename: /exports.ts
const type = 0;
const as = 0;
const something = 0;
export { type };
export { type as };
export { type something };
export { type type as foo };
export { type as as bar };
export type { type something as whatever }; // Error
