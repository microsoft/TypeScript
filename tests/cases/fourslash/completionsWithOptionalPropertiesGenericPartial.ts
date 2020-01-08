/// <reference path="fourslash.ts" />
// @strict: true

//// interface Foo {
////     a_a: boolean;
////     a_b: boolean;
////     a_c: boolean;
////     b_a: boolean;
//// }
//// function partialFoo<T extends Partial<Foo>>(t: T) {return t}
//// partialFoo({ /*1*/ });

verify.completions({
  marker: '1',
  includes: [
    {
      sortText: completion.SortText.OptionalMember,
      name: 'a_a'
    },
    {
      sortText: completion.SortText.OptionalMember,
      name: 'a_b'
    },
    {
      sortText: completion.SortText.OptionalMember,
      name: 'a_c'
    },
    {
      sortText: completion.SortText.OptionalMember,
      name: 'b_a'
    },
  ]
})
