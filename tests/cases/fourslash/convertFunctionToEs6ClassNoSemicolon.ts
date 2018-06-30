/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////var C = function() { this.x = 0; }
////0;

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`class C {
    constructor() { this.x = 0; }
}
0;`,
});
