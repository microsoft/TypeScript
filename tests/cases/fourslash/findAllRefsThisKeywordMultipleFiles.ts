/// <reference path='fourslash.ts' />

// @Filename: file1.ts
////this; this;

// @Filename: file2.ts
////this;
////this;

// @Filename: file3.ts
//// ((x = this, y) => t/**/his)(this, this);

goTo.file("file1.ts");
goTo.marker();

// TODO (drosen): The CURRENT behavior is that findAllRefs doesn't work on 'this' or 'super' keywords.
//                This should change down the line.
verify.referencesCountIs(0);