/// <reference path="fourslash.ts"/>

////type T = number | string;

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
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
