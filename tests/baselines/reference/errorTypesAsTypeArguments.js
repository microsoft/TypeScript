//// [tests/cases/compiler/errorTypesAsTypeArguments.ts] ////

//// [errorTypesAsTypeArguments.ts]
interface Foo<A> {
  bar(baz: Foo<B>): Foo<C>;
}

//// [errorTypesAsTypeArguments.js]
