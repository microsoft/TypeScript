/// <reference path='fourslash.ts' />

////function f({[|a|]}: {[|a|]}) {
////    f({[|a|]});
////}

const [r0, r1, r2] = test.ranges();
// renames the local
verify.renameLocations([r0, r2], [{ range: r0, prefixText: "a: " }, { range: r2, prefixText: "a: " }]);
// renames the property
verify.renameLocations(r1, [{ range: r0, suffixText: ": a" }, r1, { range: r2, suffixText: ": a" }]);
