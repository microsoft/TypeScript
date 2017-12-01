/// <reference path="fourslash.ts" />

//@Filename: a.ts
////var [|x|]: number;

//@Filename: b.ts
/////// <reference path="a.ts" />
////[|x|]++;

//@Filename: c.ts
/////// <reference path="a.ts" />
////[|x|]++;

verify.rangesAreRenameLocations();
