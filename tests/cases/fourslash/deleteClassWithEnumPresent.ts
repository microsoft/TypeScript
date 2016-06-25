///<reference path="fourslash.ts"/>

////enum Foo { a, b, c }
/////**/class Bar { }

goTo.marker();
edit.deleteAtCaret('class Bar { }'.length);
verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
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
                "kind": "property"
            },
            {
                "text": "b",
                "kind": "property"
            },
            {
                "text": "c",
                "kind": "property"
            }
        ],
        "indent": 1
    }
]);
