/// <reference path="fourslash.ts" />
// @strict: true

////interface Foo {
////  a: boolean;
////}
////function partialFoo<T extends Partial<Foo>>(x: T, y: T extends { b?: boolean } ? T & { c: true } : T) {
////  return x;
////}
////
////partialFoo({ a: true, b: true }, { /*1*/ });


verify.completions({
  marker: '1',
  includes: [
    {
      sortText: completion.SortText.OptionalMember,
      name: 'a'
    },
    {
      sortText: completion.SortText.OptionalMember,
      name: 'b'
    },
    {
      name: 'c'
    }
  ]
})
