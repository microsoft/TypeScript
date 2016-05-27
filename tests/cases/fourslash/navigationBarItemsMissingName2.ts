/////**
//// * This is a class.
//// */
////class /* But it has no name! */ {
////    foo() {}
////}

// Anonymous classes are still included.
verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module"
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
