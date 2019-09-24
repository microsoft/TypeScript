/// <reference path='fourslash.ts'/>

//// interface Foo { ["foo-foo"]: string }
//// async function foo(x: Promise<Foo>) {
////    [|x./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    includes: [
        "then",
        { name: "foo-foo", insertText: '(await x)["foo-foo"]', replacementSpan,  },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
