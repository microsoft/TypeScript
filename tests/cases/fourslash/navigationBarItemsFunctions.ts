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

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
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
        "indent": 1
    },
    {
        "text": "foo",
        "kind": "function",
        "childItems": [
            {
                "text": "bar",
                "kind": "function"
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
            }
        ],
        "indent": 2
    }
]);
