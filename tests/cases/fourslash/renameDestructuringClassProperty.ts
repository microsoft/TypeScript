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
verify.baselineRename([r0, r2, r1, r3, r4]);
