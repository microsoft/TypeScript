/// <reference path="fourslash.ts" />

////export type Foo = 'a' | 'b';
////
////const x: Fo/*a*/
////
////type Bar = 'c' | 'd';
////
////const x: Ba/*b*/

verify.completions({
  marker: "a",
  includes: [
      {
          name: "Foo",
          text: "type Foo = \"a\" | \"b\""
      }
  ],
},{
  marker: "b",
  includes: [
      {
          name: "Bar",
          text: "type Bar = \"c\" | \"d\""
      }
  ],
});