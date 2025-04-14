// @declaration: true
// @filename: test.ts

function getFoo() {
  return { foo: { test: 42 } }
}

const { foo } = getFoo()

export type AliasType = typeof foo

const { foo: renamed } = getFoo()

export type AliasType2 = typeof renamed

function getNested() {
  return { a: { b: { c: 'd' } } }
}

const { a: { b: { c } } } = getNested()

export type AliasType3 = typeof c
