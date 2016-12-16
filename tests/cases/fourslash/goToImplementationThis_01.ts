/// <reference path='fourslash.ts'/>

// Should go to class declaration when invoked on a this type reference

//// [|class Bar extends Foo {
////     hello(): th/*this_type*/is {
////         return this;
////     }
//// }|]

verify.allRangesAppearInImplementationList("this_type");