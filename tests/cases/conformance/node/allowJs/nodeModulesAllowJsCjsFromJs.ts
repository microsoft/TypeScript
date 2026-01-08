// @module: node16,node18,node20,nodenext
// @allowJs: true
// @noEmit: true
// @filename: foo.cjs
exports.foo = "foo"
// @filename: bar.ts
import foo from "./foo.cjs"
foo.foo;