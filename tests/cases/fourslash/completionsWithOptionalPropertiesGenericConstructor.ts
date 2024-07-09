/// <reference path="fourslash.ts" />
// @strict: true

//// interface Options {
////     someFunction?: () => string
////     anotherFunction?: () => string
//// }
//// 
//// export class Clazz<T extends Options> {
////     constructor(public a: T) {}
//// }
//// 
//// new Clazz({ /*1*/ })

verify.completions({
  marker: '1',
  includes: [
    {
      sortText: completion.SortText.OptionalMember,
      name: 'someFunction'
    },
    {
      sortText: completion.SortText.OptionalMember,
      name: 'anotherFunction'
    },
  ]
})
