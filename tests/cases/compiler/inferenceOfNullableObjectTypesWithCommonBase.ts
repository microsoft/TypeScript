// @strict: true

function equal<T>(a: T, b: T) { }

let v = null!;

// Object types with common base types

type B = { foo: string }
type D = { foo: string; bar: number }

equal(v as B, v as undefined | D)
equal(v as undefined | D, v as B)

equal<undefined | B>(v as B, v as undefined | D)
equal<undefined | B>(v as undefined | D, v as B)

equal(v as B, v as undefined)
equal(v as undefined, v as B)

equal(v as B, v as D)
equal(v as D, v as B)

equal(v as B, v as B | undefined)
equal(v as B | undefined, v as B)
