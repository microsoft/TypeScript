///<reference path="fourslash.ts"/>

////enum Foo { a, b, c }
/////**/class Bar { }

goTo.marker();
edit.deleteAtCaret('class Bar { }'.length);

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "Foo",
            "kind": "enum",
            "childItems": [
                {
                    "text": "a",
                    "kind": "const"
                },
                {
                    "text": "b",
                    "kind": "const"
                },
                {
                    "text": "c",
                    "kind": "const"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "Foo",
                "kind": "enum"
            }
        ]
    },
    {
        "text": "Foo",
        "kind": "enum",
        "childItems": [
            {
                "text": "a",
                "kind": "const"
            },
            {
                "text": "b",
                "kind": "const"
            },
            {
                "text": "c",
                "kind": "const"
            }
        ],
        "indent": 1
    }
]);
