/// <reference path='fourslash.ts' />

/////*above*/
////const x = /*next*/ function f(p) {}

for (const marker of test.markerNames()) {
    verify.docCommentTemplateAt(marker, 7,
`/**
 * 
 * @param p
 */`);
}
