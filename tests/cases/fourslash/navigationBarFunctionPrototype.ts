/// <reference path="fourslash.ts"/>

// @Filename: foo.js
////function f() {}
////f.prototype.x = 0;
////f.y = 0;
////f.prototype.method = function () {};
////Object.defineProperty(f, 'staticProp', { 
////    set: function() {}, 
////    get: function(){
////    } 
////});
////Object.defineProperty(f, 'name', { 
////    set: function() {}, 
////    get: function(){
////    } 
////}); 

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "f",
            "kind": "class",
            "childItems": [
                {
                    "text": "constructor",
                    "kind": "constructor"
                },
                {
                    "text": "method",
                    "kind": "function"
                },
                {
                    "text": "name",
                    "childItems": [
                        {
                            "text": "get",
                            "kind": "function"
                        },
                        {
                            "text": "set",
                            "kind": "function"
                        }
                    ]
                },
                {
                    "text": "staticProp",
                    "childItems": [
                        {
                            "text": "get",
                            "kind": "function"
                        },
                        {
                            "text": "set",
                            "kind": "function"
                        }
                    ]
                },
                {
                    "text": "x",
                    "kind": "property"
                },
                {
                    "text": "y"
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
                "text": "f",
                "kind": "class"
            }
        ]
    },
    {
        "text": "f",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "method",
                "kind": "function"
            },
            {
                "text": "name"
            },
            {
                "text": "staticProp"
            },
            {
                "text": "x",
                "kind": "property"
            },
            {
                "text": "y"
            }
        ],
        "indent": 1
    }
]);
