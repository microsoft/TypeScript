// @module: esnext
// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
import type defer * as ns1 from "a";
