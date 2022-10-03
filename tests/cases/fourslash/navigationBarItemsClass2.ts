/// <reference path="fourslash.ts" />

////class Foo {}
////function Foo() {}

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "Foo",
            kind: "function"
        },
        {
            text: "Foo",
            kind: "class"
        }
    ]
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            {
                text: "Foo",
                kind: "function"
            },
            {
                text: "Foo",
                kind: "class"
            }
        ]
    },
    {
        text: "Foo",
        kind: "function",
        indent: 1
    },
    {
        text: "Foo",
        kind: "class",
        indent: 1
    }
]);
