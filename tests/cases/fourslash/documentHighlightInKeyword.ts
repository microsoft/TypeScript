/// <reference path='fourslash.ts'/>

////export type Foo<T> = {
////    [K [|in|] keyof T]: any;
////}
////
////"a" [|in|] {};
////
////for (let a [|in|] {}) {}

verify.baselineDocumentHighlights();