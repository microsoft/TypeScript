/// <reference path="./fourslash.ts" />

//// declare module "foo";  
//// declare module "foo";

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "\"foo\"",
                "kind": "module",
                "kindModifiers": "declare"
            }
        ]
    },
    {
        "text": "\"foo\"",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    }
]);