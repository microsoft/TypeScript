/// <reference path='fourslash.ts'/>

////export type Foo<T> = {
////    [K [|in|] keyof T]: any;
////}
////
////"a" [|in|] {};
////
////for (let a [|in|] {}) {}

for (let range of test.ranges()) {
    verify.noDocumentHighlights(range);
}
