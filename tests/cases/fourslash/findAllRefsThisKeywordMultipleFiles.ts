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
verify.referencesCountIs(8);