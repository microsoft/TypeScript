/// <reference path="fourslash.ts" />

// @Filename: a.ts
//// subTitle:
//// [|export|] const title: string

verify.baselineDocumentHighlights(test.ranges()[0], { filesToSearch: [test.ranges()[0].fileName] });

