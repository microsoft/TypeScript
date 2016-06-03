/// <reference path="fourslash.ts"/>

////var x = 0;
////let y = 1;
////const z = 2;

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "x",
                "kind": "var"
            },
            {
                "text": "y",
                "kind": "let"
            },
            {
                "text": "z",
                "kind": "const"
            }
        ]
    }
]);
