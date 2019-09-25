/// <reference path='fourslash.ts'/>

//// interface Foo { foo: string }
//// async function foo(x: (a: number) => Promise<Foo>) {
////    [|x(1)./**/|]
//// }

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    includes: [
        "then",
        { name: "foo", insertText: '(await x(1)).foo', replacementSpan },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
