/// <reference path="fourslash.ts" />

//@Filename: a.ts
////var /*1*/[|x|]: number;

//@Filename: b.ts
/////// <reference path="a.ts" />
////[|x|]++;

//@Filename: c.ts
/////// <reference path="a.ts" />
////[|x|]++;

goTo.file("a.ts");
goTo.marker("1");

verify.renameLocations( /*findInStrings*/ false, /*findInComments*/ false);