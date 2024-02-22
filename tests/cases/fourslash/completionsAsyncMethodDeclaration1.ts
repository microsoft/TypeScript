/// <reference path="fourslash.ts" />

//// const obj = {
////   a() {},
////   async b/*1*/
//// };
//// const obj2 = {
////   async /*2*/
//// };
//// class Foo {
////   async b/*3*/
//// }
//// class Foo2 {
////   async /*4*/
//// }
//// class Bar {
////   static async b/*5*/
//// }

test.markerNames().forEach(marker => {
  verify.completions({
    marker,
    isNewIdentifierLocation: true
  });
});
