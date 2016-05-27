/// <reference path="fourslash.ts"/>

////type T = number | string;

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "T",
                "kind": "type"
            }
        ]
    },
    {
        "text": "T",
        "kind": "type",
        "indent": 1
    }
]);
