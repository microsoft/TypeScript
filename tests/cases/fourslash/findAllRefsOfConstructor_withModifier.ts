/// <reference path="fourslash.ts" />

////class X {
////    public [|constructor|]() {}
////}
////var x = new [|X|]();

const ranges = test.ranges();
verify.referenceGroups(ranges[0], [{ definition: "constructor X(): X", ranges }]);
