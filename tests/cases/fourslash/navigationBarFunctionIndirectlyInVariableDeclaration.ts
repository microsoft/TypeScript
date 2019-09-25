/// <reference path="fourslash.ts"/>

////var a = {
////    propA: function() {
////        var c;
////    }
////};
////var b;
////b = {
////    propB: function() {
////    // function must not have an empty body to appear top level
////        var d;
////    }
////};

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "var",
            "childItems": [
                {
                    "text": "propA",
                    "kind": "method",
                    "childItems": [
                        {
                            "text": "c",
                            "kind": "var"
                        }
                    ]
                }
            ]
        },
        {
            "text": "b",
            "kind": "var"
        },
        {
            "text": "propB",
            "kind": "method",
            "childItems": [
                {
                    "text": "d",
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
              "text": "a",
              "kind": "var"
          },
          {
              "text": "b",
              "kind": "var"
          },
          {
              "text": "propB",
              "kind": "method"
          }
      ]
    },
    {
        "text": "a",
        "kind": "var",
        "childItems": [
            {
                "text": "propA",
                "kind": "method"
            }
        ],
        "indent": 1
    },
    {
        "text": "propA",
        "kind": "method",
        "childItems": [
            {
                "text": "c",
                "kind": "var"
            }
        ],
        "indent": 2
    },
    {
        "text": "propB",
        "kind": "method",
        "childItems": [
            {
                "text": "d",
                "kind": "var"
            }
        ],
        "indent": 1
    }
]);
