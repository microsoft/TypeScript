/// <reference path="fourslash.ts" />

////class X {
////    [|public [|{| "contextRangeIndex": 0 |}constructor|]() {}|]
////}
////var x = new [|X|]();

const [rDef, ...ranges] = test.ranges();
verify.referenceGroups(ranges[0], [{ definition: "class X", ranges }]);
