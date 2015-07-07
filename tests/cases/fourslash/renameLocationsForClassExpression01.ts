/// <reference path='fourslash.ts'/>

////class Foo {
////}
////
////var x = class [|Foo|] {
////    doIt() {
////        return [|Foo|];
////    }
////
////    static doItStatically() {
////        return [|Foo|];
////    }
////} 
////
////var y = class {
////   getSomeName() {
////      return Foo
////   }
////}


// TODO (yuit): Fix up this test when class expressions are supported.
//              Just uncomment the below, remove the marker, and add the
//              appropriate ranges in the test itself.

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}