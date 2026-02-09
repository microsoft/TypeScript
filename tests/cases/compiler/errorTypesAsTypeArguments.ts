// @target: es2015
interface Foo<A> {
  bar(baz: Foo<B>): Foo<C>;
}