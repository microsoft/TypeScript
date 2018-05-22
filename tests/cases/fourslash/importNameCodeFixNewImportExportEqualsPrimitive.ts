/// <reference path="fourslash.ts" />

////[|valueOf/*0*/();|]

// @Filename: foo.ts
////declare var x: number;
////export = x;

verify.codeFixAvailable([]); // See GH#20191
