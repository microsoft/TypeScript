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

verify.rangesAreRenameLocations();
