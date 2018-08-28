/// <reference path='fourslash.ts'/>

// @allowJs: true
// @checkJs: true
// @Filename: /foo.js

/////**
//// * Doc
//// * @template {new (...args: any[]) => any} T
//// * @param {T} cls
//// */
////function /**/myMixin(cls) {
////    return class extends cls {}
////}

verify.quickInfoAt("",
`function myMixin<T extends new (...args: any[]) => any>(cls: T): {
    new (...args: any[]): (Anonymous class);
    prototype: myMixin<any>.(Anonymous class);
} & T`,
"Doc");
