/// <reference path="fourslash.ts" />
// @strict: true

//// interface DeepOptions {
////     another?: boolean;
//// }
//// interface MyOptions {
////     hello?: boolean;
////     world?: boolean;
////     deep?: DeepOptions
//// }
//// declare function bar<T extends MyOptions>(options?: Partial<T>): void;
//// bar({ deep: {/*1*/} });

verify.completions({
  marker: '1',
  includes: [
    {
      sortText: completion.SortText.OptionalMember,
      name: 'another'
    },
  ]
})
