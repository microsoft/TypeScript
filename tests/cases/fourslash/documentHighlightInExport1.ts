/// <reference path='fourslash.ts'/>

//// class [|C|] {}
//// [|export|] { [|C|] [|as|] [|D|] };

const [classRange, exportKeywordRange, propertyNameRange, asKeywordRange, nameRange] = test.ranges();
verify.noDocumentHighlights(exportKeywordRange);
verify.documentHighlightsOf(propertyNameRange, [classRange, propertyNameRange, nameRange]);
verify.noDocumentHighlights(asKeywordRange);
verify.documentHighlightsOf(nameRange, [nameRange]);
