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
////        return [|Foo|].y;
////    }
////} 
////
////var y = class {
////   getSomeName() {
////      return Foo
////   }
////}
////var z = class Foo {}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}