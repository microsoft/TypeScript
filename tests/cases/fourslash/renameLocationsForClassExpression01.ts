/// <reference path='fourslash.ts'/>

////class Foo {
////}
////
////var x = [|class [|{| "declarationRangeIndex": 0 |}Foo|] {
////    doIt() {
////        return [|Foo|];
////    }
////
////    static doItStatically() {
////        return [|Foo|].y;
////    }
////}|]
////
////var y = class {
////   getSomeName() {
////      return Foo
////   }
////}
////var z = class Foo {}

const [rDef, ...rest] = test.ranges();
verify.rangesAreRenameLocations(rest);
