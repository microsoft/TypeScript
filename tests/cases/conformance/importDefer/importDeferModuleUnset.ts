// @filename: a.ts
export function foo() {
    console.log("foo from a");
}

// @filename: b.ts
import defer * as aNs from "./a";

aNs.foo();
