// @target: es2020
// @filename: b.ts
import.defer("a").then(ns => {
  ns.foo();
});
