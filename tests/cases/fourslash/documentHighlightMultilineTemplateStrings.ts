/// <reference path='fourslash.ts'/>

////const foo = `
////    a
////    [|b|]
////    c
////`

const [r] = test.ranges();
verify.baselineDocumentHighlights(r);
