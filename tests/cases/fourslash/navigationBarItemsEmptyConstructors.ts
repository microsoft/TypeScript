/// <reference path="fourslash.ts"/>

////class Test {
////    constructor() {
////    }
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "Test",
                "kind": "class"
            }
        ],
        "indent": 0
    },
    {
        "text": "Test",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            }
        ],
        "indent": 1
    }
]);
