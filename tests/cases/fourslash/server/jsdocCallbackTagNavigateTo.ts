/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocCallback.js

//// /**
////  * @callback FooCallback
////  * @param {string} eventName
////  */
//// /** @type {FooCallback} */
//// var t;

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "FooCallback",
                "kind": "type"
            },
            {
                "text": "t",
                "kind": "var"
            }
        ]
    },
    {
        "text": "FooCallback",
        "kind": "type",
        "indent": 1
    }
]);