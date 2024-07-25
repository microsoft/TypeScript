/// <reference path='fourslash.ts' />

//@Filename: C:\a\b\c.ts
////var /*1*/[|x|] = 1;

const range = test.ranges()[0];
verify.baselineDocumentHighlights(range, { filesToSearch: [range.fileName] });