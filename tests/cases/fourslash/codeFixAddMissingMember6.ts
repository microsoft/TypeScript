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
    description: "Initialize property 'foo' in the constructor",
    index: 0,
    newFileContent: `class C {
    constructor() {
        this.foo = undefined;
    }
    prop = ()=>{ this.foo === 10 };
}`
});
