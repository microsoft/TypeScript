/// <reference path='fourslash.ts'/>

//// interface Foo { foo: string }
//// async function foo(x: (a: number) => Promise<Foo>) {
////    [|await x(1)./*1*/|]
////    ;([|await x(1)./*2*/|])
////    ;(await ([|x(1)./*3*/|]))
//// }

for (const marker of [1, 2, 3]) {
    verify.completions({
        marker: marker.toString(),
        includes: [
            "then",
            { name: "foo", insertText: '(await x(1)).foo', replacementSpan: test.ranges()[marker - 1] },
        ],
        preferences: {
            includeInsertTextCompletions: true,
        },
    });
}
