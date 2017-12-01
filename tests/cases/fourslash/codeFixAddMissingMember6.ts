/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////class C {
////    constructor() {
////    }
////    prop = ()=>{ this.foo === 10 };
////}

verify.codeFix({
    description: "Initialize property 'foo' in the constructor.",
    index: 0,
    // TODO: GH#18445
    newFileContent: `class C {
    constructor() {
        this.foo = undefined;\r
    }
    prop = ()=>{ this.foo === 10 };
}`
});
