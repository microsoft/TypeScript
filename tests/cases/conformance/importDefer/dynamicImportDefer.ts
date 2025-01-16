// @module: esnext
// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
import.defer("a").then(ns => {
  ns.foo();
});
