/// <reference path="fourslash.ts" />

//@Filename: a.ts
////[|var [|{| "declarationRangeIndex": 0 |}x|]: number;|]

//@Filename: b.ts
/////// <reference path="a.ts" />
////[|x|]++;

//@Filename: c.ts
/////// <reference path="a.ts" />
////[|x|]++;

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
