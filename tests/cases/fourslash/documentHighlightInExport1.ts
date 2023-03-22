/// <reference path='fourslash.ts'/>

//// class [|C|] {}
//// [|export|] { [|C|] [|as|] [|D|] };

const [classRange, exportKeywordRange, propertyNameRange, asKeywordRange, nameRange] = test.ranges();
verify.baselineDocumentHighlights();
