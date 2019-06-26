/// <reference path='fourslash.ts'/>

//// interface Foo { foo: string }
//// async function foo(x: Promise<Foo>) {
////    [|x./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    includes: [
        "then",
        { name: "foo", insertText: '(await x).foo', replacementSpan },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
