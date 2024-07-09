/// <reference path="fourslash.ts" />

////class Foo {}
////let Foo = 1;

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "Foo",
            kind: "let"
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
                kind: "let"
            },
            {
                text: "Foo",
                kind: "class"
            }
        ]
    },
    {
        text: "Foo",
        kind: "class",
        indent: 1
    }
])
