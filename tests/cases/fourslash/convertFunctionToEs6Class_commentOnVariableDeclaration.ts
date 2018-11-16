/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
/////** Doc */
////const C = function() { this.x = 0; }

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`
/** Doc */
class C {
    constructor() { this.x = 0; }
}
`,
});
