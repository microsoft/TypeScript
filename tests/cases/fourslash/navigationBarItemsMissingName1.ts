////export function
////class C {
////    foo() {}
////}

verify.navigationTree({
    "text": "\"navigationBarItemsMissingName1\"",
    "kind": "module",
    "childItems": [
        {
            "text": "<function>",
            "kind": "function",
            "kindModifiers": "export"
        },
        {
            "text": "C",
            "kind": "class",
            "childItems": [
                {
                    "text": "foo",
                    "kind": "method"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        "text": "\"navigationBarItemsMissingName1\"",
        "kind": "module",
        "childItems": [
            {
                "text": "<function>",
                "kind": "function",
                "kindModifiers": "export"
            },
            {
                "text": "C",
                "kind": "class"
            }
        ]
    },
    {
        "text": "C",
        "kind": "class",
        "childItems": [
            {
                "text": "foo",
                "kind": "method"
            }
        ],
        "indent": 1
    }
]);
