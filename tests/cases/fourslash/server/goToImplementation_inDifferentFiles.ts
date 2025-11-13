/// <reference path='../fourslash.ts'/>

// @Filename: /home/src/workspaces/project/bar.ts
////import {Foo} from './foo'
////
////class [|A|] implements Foo {
////    func() {}
////}
////
////class [|B|] implements Foo {
////    func() {}
////}

// @Filename: /home/src/workspaces/project/foo.ts
////export interface /**/Foo {
////    func();
////}

verify.baselineGoToImplementation("");
