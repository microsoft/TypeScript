/// <reference path="fourslash.ts" />
// @strict: true
////
//// repro #9900
////
//// interface Test {
////   a?: number;
////   b?: string;
//// }
////
//// interface TestIndex {
////   [key: string]: Test;
//// }
////
//// declare function testFunc<T extends TestIndex>(t: T): void;
////
//// testFunc({
////   test: {
////     /**/
////   },
//// });

verify.completions({
  marker: '',
  exact: [
    { name: 'a', sortText: completion.SortText.OptionalMember },
    { name: 'b', sortText: completion.SortText.OptionalMember },
  ]
});