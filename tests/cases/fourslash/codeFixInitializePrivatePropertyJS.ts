/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true

// @Filename: /a.js
////class Foo {
////    constructor(name) {
////        this.[|#name|] = name;
////    }
////}

verify.codeFixAvailable([
    { description: "Declare a private field named '#name'." },
    { description: "Ignore this error message" },
    { description: "Disable checking for this file" },
    { description: "Infer parameter types from usage" },
]);

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Declare_a_private_field_named_0.message, '#name'],
    newFileContent: `class Foo {
    #name;
    constructor(name) {
        this.#name = name;
    }
}`
});
