// @strict: true
// @noEmit: true

// Repro from #25083

enum Type {
  Foo = 'foo',
  '3x14' = '3x14'
}

type TypeMap = {
  [Type.Foo]: any
  [Type['3x14']]: any
}

const x: TypeMap = {
  [Type.Foo]: 1,
  [Type['3x14']]: 2
};
