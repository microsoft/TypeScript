/// <reference path='../fourslash.ts'/>

// @lib: es5

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
