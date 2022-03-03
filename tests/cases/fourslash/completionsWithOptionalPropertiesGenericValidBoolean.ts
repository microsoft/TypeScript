/// <reference path="fourslash.ts" />
// @strict: true

//// interface MyOptions {
////     hello?: boolean;
////     world?: boolean;
//// }
//// declare function bar<T extends MyOptions>(options?: Partial<T>): void;
//// bar({ hello: true, /*1*/ });

verify.completions({
  marker: '1',
  includes: [
    {
      sortText: completion.SortText.OptionalMember,
      name: 'world'
    },
  ]
})
