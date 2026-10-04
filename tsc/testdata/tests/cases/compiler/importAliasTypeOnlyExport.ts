// @target: esnext
// @module: commonjs
// @noEmit: true

// @filename: t.ts
import a = require("./a");
import foo = a.Foo

// @filename: a.ts
type Foo = { x: number }
export type { Foo };
