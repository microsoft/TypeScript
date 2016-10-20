/// <reference path="fourslash.ts"/>

////function foo() {
////    var x = 10;
////    function bar() {
////        var y = 10;
////        function biz() {
////            var z = 10;
////        }
////    }
////}
////
////function baz() {
////    var v = 10;
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "baz",
            "kind": "function",
            "childItems": [
                {
                    "text": "v",
                    "kind": "var"
                }
            ]
        },
        {
            "text": "foo",
            "kind": "function",
            "childItems": [
                {
                    "text": "bar",
                    "kind": "function",
                    "childItems": [
                        {
                            "text": "biz",
                            "kind": "function",
                            "childItems": [
                                {
                                    "text": "z",
                                    "kind": "var"
                                }
                            ]
                        },
                        {
                            "text": "y",
                            "kind": "var"
                        }
                    ]
                },
                {
                    "text": "x",
                    "kind": "var"
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
                "text": "baz",
                "kind": "function"
            },
            {
                "text": "foo",
                "kind": "function"
            }
        ]
    },
    {
        "text": "baz",
        "kind": "function",
        "childItems": [
            {
                "text": "v",
                "kind": "var"
            }
        ],
        "indent": 1
    },
    {
        "text": "foo",
        "kind": "function",
        "childItems": [
            {
                "text": "bar",
                "kind": "function"
            },
            {
                "text": "x",
                "kind": "var"
            }
        ],
        "indent": 1
    },
    {
        "text": "bar",
        "kind": "function",
        "childItems": [
            {
                "text": "biz",
                "kind": "function"
            },
            {
                "text": "y",
                "kind": "var"
            }
        ],
        "indent": 2
    }
]);
