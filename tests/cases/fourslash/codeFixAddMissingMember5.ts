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
    description: "Initialize static property 'foo'",
    index: 0,
    newFileContent: `class C {
    static method() {
        ()=>{ this.foo === 10 };
    }
}

C.foo = undefined;
`
});
