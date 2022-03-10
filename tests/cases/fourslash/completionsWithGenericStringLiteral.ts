/// <reference path="fourslash.ts" />
// @strict: true

//// declare function get<T, K extends keyof T>(obj: T, key: K): T[K];
//// get({ hello: 123, world: 456 }, "/**/");

verify.completions({
  marker: "",
  includes: ["hello", "world"]
});
