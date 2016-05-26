/// <reference path="fourslash.ts"/>

////enum E {
////    // No nav bar entry for this
////    [Symbol.isRegExp] = 0
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "E",
                "kind": "enum"
            }
        ],
        "indent": 0
    },
    {
        "text": "E",
        "kind": "enum",
        "childItems": [],
        "indent": 1
    }
]);
