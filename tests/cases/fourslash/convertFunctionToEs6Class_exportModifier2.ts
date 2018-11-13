/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////export const foo = function() {
////};
////foo.prototype.instanceMethod = function() {
////};

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`export class foo {
    constructor() {
    }
    instanceMethod() {
    }
}
`,
});
