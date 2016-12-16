/// <reference path="fourslash.ts"/>

////var a = {
////    propA: function() {}
////};
////var b;
////b = {
////    propB: function() {}
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
                    "kind": "function"
                }
            ]
        },
        {
            "text": "b",
            "kind": "var"
        },
        {
            "text": "propB",
            "kind": "function"
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
              "kind": "function"
          }
      ]
    },
    {
        "text": "a",
        "kind": "var",
        "childItems": [
            {
                "text": "propA",
                "kind": "function"
            }
        ],
        "indent": 1
    },
    {
        "text": "propB",
        "kind": "function",
        "indent": 1
    }
]);
