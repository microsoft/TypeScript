// @module: commonjs
// @Filename: a.ts
const foo = {
  a: 1
}

export default foo as Readonly<typeof foo>

// @Filename: b.ts
import foo from './a'

foo.a = 2
