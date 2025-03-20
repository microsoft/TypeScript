// @module: esnext
// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
import defer type * as ns1 from "a";
