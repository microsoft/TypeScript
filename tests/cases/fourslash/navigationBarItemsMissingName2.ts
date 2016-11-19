/////**
//// * This is a class.
//// */
////class /* But it has no name! */ {
////    foo() {}
////}

// Anonymous classes are still included.
verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "<class>",
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
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "<class>",
                "kind": "class"
            }
        ]
    },
    {
        "text": "<class>",
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
