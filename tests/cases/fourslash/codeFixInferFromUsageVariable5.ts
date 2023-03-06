/// <reference path='fourslash.ts' />

// @noImplicitAny: true

// @Filename: /a.ts
////var foobarfoobarfoobarfoobar;

// @Filename: /b.ts
////function bar() {
////    let y = foobarfoobarfoobarfoobar/**/;
////}

goTo.file("/b.ts");
goTo.marker("");
verify.codeFix({
    description: "Infer type of 'foobarfoobarfoobarfoobar' from usage",
    index: 0,
    newFileContent: {
        "/a.ts": "var foobarfoobarfoobarfoobar: any;"
    }
});
