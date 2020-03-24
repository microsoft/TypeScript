/// <reference path="fourslash.ts" />
// @strict: true

//// declare function get<T, K extends keyof T>(obj: T, key: K): T[K];
//// get({ hello: 123, world: 456 }, "[|/**/|]");

verify.completions({
  marker: "",
  includes: [
    { name: 'hello', replacementSpan: test.ranges()[0] },
    { name: 'world', replacementSpan: test.ranges()[0] }
  ]
});
