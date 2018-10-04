/// <reference path="fourslash.ts"/>

////enum E {
////    // No nav bar entry for this
////    [Symbol.isRegExp] = 0
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "E",
            "kind": "enum"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "E",
                "kind": "enum"
            }
        ]
    },
    {
        "text": "E",
        "kind": "enum",
        "indent": 1
    }
]);
