/// <reference path='fourslash.ts' />

////function f() {
////    for await (const x of g()) {
////        console.log(x);
////    }
////}

verify.codeFix({
    description: "Convert to async",
    index: 0,
    newFileContent:
`function f() => {\r
    for await (const x of g()) {\r
        console.log(x);\r
    }\r
}`,
});
