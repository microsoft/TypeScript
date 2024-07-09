// @allowSyntheticDefaultImports: true
// @module: commonjs
// @Filename: b.d.ts
export function foo();

export function bar();

// @Filename: a.ts
import Foo = require("./b");
Foo.default.bar();
Foo.default.default.foo();