/// <reference path='fourslash.ts' />

////class A {
////    [|[|{| "contextRangeIndex": 0 |}foo|]: string;|]
////}
////class B {
////    syntax1(a: A): void {
////        [|let { [|{| "contextRangeIndex": 2 |}foo|] } = a;|]
////    }
////    syntax2(a: A): void {
////        [|let { [|{| "contextRangeIndex": 4 |}foo|]: foo } = a;|]
////    }
////    syntax11(a: A): void {
////        [|let { [|{| "contextRangeIndex": 6 |}foo|] } = a;|]
////        [|foo|] = "newString";
////    }
////}

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4] = test.ranges();
verify.renameLocations([r0, r2], [r0, { range: r1, suffixText: ": foo" }, r2, { range: r3, suffixText: ": foo" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "foo: " }]);
verify.renameLocations([r3, r4], [{ range: r3, prefixText: "foo: " }, r4]);
