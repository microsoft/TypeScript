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
        ],
        "indent": 0
    },
    {
        "text": "T",
        "kind": "type",
        "childItems": [],
        "indent": 1
    }
]);
