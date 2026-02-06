// @target: es2015
// @strict: false
// #23734
type ObjType = {
  foo: string
  baz: string
  quux: string
}

const obj: Readonly<ObjType> = {
  foo: 'bar',
  baz: 'qux',
  quux: 'quuz',
}

const { foo, ...rest } = obj

delete rest.baz
