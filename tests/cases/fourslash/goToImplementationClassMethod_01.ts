/// <reference path='fourslash.ts'/>

// Should handle calls made on member declared in an abstract class

//// abstract class AbstractBar {
////     abstract they/*declaration*/llo(): void;
//// }
////
//// class Bar extends AbstractBar{
////     [|hello|]() {}
//// }
////
//// function whatever(x: AbstractBar) {
////     x.they/*reference*/llo();
//// }

verify.allRangesAppearInImplementationList("reference");
verify.allRangesAppearInImplementationList("declaration");