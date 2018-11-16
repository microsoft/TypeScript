/// <reference path='../fourslash.ts'/>

// @Filename: /bar.ts
////import {Foo} from './foo'
////
////class [|A|] implements Foo {
////    func() {}
////}
////
////class [|B|] implements Foo {
////    func() {}
////}

// @Filename: /foo.ts
////export interface /**/Foo {
////    func();
////}

verify.allRangesAppearInImplementationList("");
