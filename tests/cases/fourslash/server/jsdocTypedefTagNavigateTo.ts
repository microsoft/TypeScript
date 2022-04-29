/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** @typedef {(string | number)} NumberLike */
//// /** @typedef {(string | number | string[])} */
//// var NumberLike2;
////
//// /** @type {/*1*/NumberLike} */
//// var numberLike;

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "numberLike",
            "kind": "var"
        },
        {
            "text": "NumberLike",
            "kind": "type"
        },
        {
            "text": "NumberLike2",
            "kind": "var"
        },
        {
            "text": "NumberLike2",
            "kind": "type"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "numberLike",
                "kind": "var"
            },
            {
                "text": "NumberLike",
                "kind": "type"
            },
            {
                "text": "NumberLike2",
                "kind": "var"
            },
            {
                "text": "NumberLike2",
                "kind": "type"
            }
        ]
    },
    {
        "text": "NumberLike",
        "kind": "type",
        "indent": 1,
    },
    {
        "text": "NumberLike2",
        "kind": "type",
        "indent": 1
    }
]);