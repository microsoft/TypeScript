/// <reference path='fourslash.ts'/>

////[|case|]
////[|default|]

const [defaultKeywordRange, caseKeywordRange] = test.ranges();
verify.noDocumentHighlights(defaultKeywordRange);
verify.noDocumentHighlights(caseKeywordRange);
