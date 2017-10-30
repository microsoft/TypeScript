/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////class C {
////    static p = ()=>{ this.foo === 10 };
////}

verify.codeFix({
    description: "Initialize static property 'foo'.",
    index: 2,
    // TODO: GH#18445
    newFileContent: `class C {
    static p = ()=>{ this.foo === 10 };
}\r
C.foo = undefined;\r
`
});
