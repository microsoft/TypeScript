// @module: esnext,nodenext,es2020,es2015,commonjs
// @target: es2020

// @filename: a.ts
export function foo() {
  console.log("foo from a");
}

// @filename: b.ts
import.defer("./a.js").then(ns => {
  ns.foo();
});
