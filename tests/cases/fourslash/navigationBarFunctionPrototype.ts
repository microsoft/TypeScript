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
////Object.defineProperty(f.prototype, 'name', { 
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
                    "text": "x",
                    "kind": "property"
                },
                {
                    "text": "y"
                },
                {
                    "text": "method",
                    "kind": "function"
                },
                {
                    "text": "staticProp",
                    "childItems": [
                        {
                            "text": "get",
                            "kind": "method"
                        },
                        {
                            "text": "set",
                            "kind": "method"
                        }
                    ]
                },
                {
                    "text": "name",
                    "childItems": [
                        {
                            "text": "get",
                            "kind": "method"
                        },
                        {
                            "text": "set",
                            "kind": "method"
                        }
                    ]
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
                "text": "x",
                "kind": "property"
            },
            {
                "text": "y"
            },
            {
                "text": "method",
                "kind": "function"
            },
            {
                "text": "staticProp"
            },
            {
                "text": "name"
            }
        ],
        "indent": 1
    },
    {
        "text": "staticProp",
        "childItems": [
          {
            "text": "get",
            "kind": "method"
          },
          {
            "text": "set",
            "kind": "method"
          }
        ],
        "indent": 2
      },
      {
        "text": "name",
        "childItems": [
          {
            "text": "get",
            "kind": "method"
          },
          {
            "text": "set",
            "kind": "method"
          }
        ],
        "indent": 2
      }
]);
