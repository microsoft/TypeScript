// @strict: true
// @noEmit: true

class baz<B> {}
interface foo<A> {
  new (): typeof baz
}

const bar = (foo<string>)<number>
