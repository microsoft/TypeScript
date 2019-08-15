/// <reference path='fourslash.ts' />
// @Filename: foo.js

/////** @class */
////function C() { }
/////*above*/
////C.prototype.method = /*next*/ function (p) {}

for (const marker of test.markerNames()) {
    verify.docCommentTemplateAt(marker, 8,
`/**
 * 
 * @param {any} p
 */`);
}
