////class C {
////    static x;
////    x;
////}

// Anonymous classes are still included.
verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "C",
            "kind": "class",
            "childItems": [
                {
                    "text": "x",
                    "kind": "property",
                    "kindModifiers": "static"
                },
                {
                    "text": "x",
                    "kind": "property"
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
                "text": "x",
                "kind": "property",
                "kindModifiers": "static"
            },
            {
                "text": "x",
                "kind": "property"
            }
        ],
        "indent": 1
    }
]);
