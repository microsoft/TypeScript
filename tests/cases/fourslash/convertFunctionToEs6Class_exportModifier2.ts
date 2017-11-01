/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////export const /**/foo = function() {
////};
////foo.prototype.instanceMethod = function() {
////};

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`export class foo {
    constructor() {
    }
    instanceMethod() {
    }
}
`,
'Convert to ES2015 class', 'convert');
