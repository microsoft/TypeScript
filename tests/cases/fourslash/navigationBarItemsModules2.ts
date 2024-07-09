/// <reference path="fourslash.ts"/>

////namespace Test.A { }
////
////namespace Test.B {
////    class Foo { }
////}

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "Test.A",
            kind: "module"
        },
        {
            text: "Test.B",
            kind: "module",
            childItems: [
                {
                    text: "Foo",
                    kind: "class"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            {
                text: "Test.A",
                kind: "module"
            },
            {
                text: "Test.B",
                kind: "module"
            }
        ]
    },
    {
        text: "Test.A",
        kind: "module",
        indent: 1
    },
    {
        text: "Test.B",
        kind: "module",
        childItems: [
            {
                text: "Foo",
                kind: "class"
            }
        ],
        indent: 1
    },
    {
        text: "Foo",
        kind: "class",
        indent: 2
    }
]);
