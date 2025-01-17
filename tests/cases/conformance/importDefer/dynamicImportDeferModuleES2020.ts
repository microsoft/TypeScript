// @module: es2020
// @target: es2020

// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
import.defer("./a").then(ns => {
  ns.foo();
});

import("./a"); // TODO: Removing this makes the `import.defer` call complain about module not found
