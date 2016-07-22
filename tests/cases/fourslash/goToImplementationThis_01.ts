/// <reference path='fourslash.ts'/>

//// [|class Bar extends Foo {
////     hello(): th/*this_type*/is {
////         return this;
////     }
//// }|]

goTo.marker("this_type");
verify.allRangesAppearInImplementationList();