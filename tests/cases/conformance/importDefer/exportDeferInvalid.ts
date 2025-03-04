// @module: esnext
// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
export defer * as ns from "a";
