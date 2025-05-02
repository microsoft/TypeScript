/// <reference path="fourslash.ts" />

// @Filename: a.ts
//// const k = {
////     [|export|] f() { }
//// }

verify.baselineDocumentHighlights(test.ranges()[0], { filesToSearch: [test.ranges()[0].fileName] });

