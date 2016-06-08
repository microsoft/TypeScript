////export function
////class C {
////    foo() {}
////}

verify.navigationBar([
    {
        "text": "\"navigationBarItemsMissingName1\"",
        "kind": "module",
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
                "text": "foo",
                "kind": "method"
            }
        ],
        "indent": 1
    }
]);
