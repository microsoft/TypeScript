/// <reference path="fourslash.ts" />

//// const obj = {
////   a() {},
////   * b/*1*/
//// };
//// const obj2 = {
////   * /*2*/
//// };
//// const obj3 = {
////   async * /*3*/
//// };
//// class Foo {
////   * b/*4*/
//// }
//// class Foo2 {
////   * /*5*/
//// }
//// class Bar {
////   static * b/*6*/
//// }

test.markerNames().forEach(marker => {
  verify.completions({
    marker,
    isNewIdentifierLocation: true
  });
});
