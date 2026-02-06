/// <reference path="fourslash.ts"/>

////describe('foo', () => {
////    test(`a ${1} b ${2}`, () => {})
////})
////
////const a = 1;
////const b = 2;
////describe('foo', () => {
////    test(`a ${a} b {b}`, () => {})
////})

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "const"
        },
        {
            "text": "b",
            "kind": "const"
        },
        {
            "text": "describe('foo') callback",
            "kind": "function",
            "childItems": [
                {
                    "text": "test(`a ${1} b ${2}`) callback",
                    "kind": "function"
                }
            ]
        },
        {
            "text": "describe('foo') callback",
            "kind": "function",
            "childItems": [
                {
                    "text": "test(`a ${a} b {b}`) callback",
                    "kind": "function"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "a",
                "kind": "const"
            },
            {
                "text": "b",
                "kind": "const"
            },
            {
                "text": "describe('foo') callback",
                "kind": "function"
            },
            {
                "text": "describe('foo') callback",
                "kind": "function"
            }
        ]
    },
    {
        "text": "describe('foo') callback",
        "kind": "function",
        "childItems": [
            {
                "text": "test(`a ${1} b ${2}`) callback",
                "kind": "function"
            }
        ],
        "indent": 1
    },
    {
        "text": "describe('foo') callback",
        "kind": "function",
        "childItems": [
            {
                "text": "test(`a ${a} b {b}`) callback",
                "kind": "function"
            }
        ],
        "indent": 1
    }
]);
