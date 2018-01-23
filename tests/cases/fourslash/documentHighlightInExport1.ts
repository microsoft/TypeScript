/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class [|C|] {}
//// [|export|] { [|C|] [|as|] [|D|] };

const [classRange, exportKeywordRange, propertyNameRange, asKeywordRange, nameRange] = test.ranges();
verify.noDocumentHighlights(exportKeywordRange);
verify.documentHighlightsOf(propertyNameRange, [classRange, propertyNameRange, nameRange]);
verify.noDocumentHighlights(asKeywordRange);
verify.documentHighlightsOf(nameRange, [nameRange]);
