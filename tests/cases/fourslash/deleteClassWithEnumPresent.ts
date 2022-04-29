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
                    "kind": "enum member"
                },
                {
                    "text": "b",
                    "kind": "enum member"
                },
                {
                    "text": "c",
                    "kind": "enum member"
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
                "kind": "enum member"
            },
            {
                "text": "b",
                "kind": "enum member"
            },
            {
                "text": "c",
                "kind": "enum member"
            }
        ],
        "indent": 1
    }
]);
