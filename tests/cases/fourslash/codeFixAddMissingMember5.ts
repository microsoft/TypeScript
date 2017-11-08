/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////class C {
////    static method() {
////        ()=>{ this.foo === 10 };
////    }
////}

verify.codeFix({
    description: "Initialize static property 'foo'.",
    index: 0,
    // TODO: GH#18445
    newFileContent: `class C {
    static method() {
        ()=>{ this.foo === 10 };
    }
}\r
C.foo = undefined;\r
`
});
