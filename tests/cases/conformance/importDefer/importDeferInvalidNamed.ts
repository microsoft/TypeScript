// @module: esnext
// @filename: a.ts
export function foo() {
    console.log("foo from a");
}

// @filename: b.ts
import defer { foo } from "a";

foo();