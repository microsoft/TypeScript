/// <reference path="fourslash.ts"/>

////var a = {
////    b: 0,
////    c: {},
////    d: {
////        e: 1,
////    },
////    f: {
////        g: 2,
////        h: {
////            i: 3,
////        },
////    },
////    j: [
////        {
////            k: 4,
////        },
////        {
////            l: 5,
////        },
////    ],
////}

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "childItems": [
    {
      "text": "a",
      "kind": "var",
      "childItems": [
        {
          "text": "b",
          "kind": "property"
        },
        {
          "text": "c",
          "kind": "property"
        },
        {
          "text": "d",
          "kind": "property",
          "childItems": [
            {
              "text": "e",
              "kind": "property"
            }
          ]
        },
        {
          "text": "f",
          "kind": "property",
          "childItems": [
            {
              "text": "g",
              "kind": "property"
            },
            {
              "text": "h",
              "kind": "property",
              "childItems": [
                {
                  "text": "i",
                  "kind": "property"
                }
              ]
            }
          ]
        },
        {
          "text": "j",
          "kind": "property",
          "childItems": [
            {
              "text": "0",
              "childItems": [
                {
                  "text": "k",
                  "kind": "property"
                }
              ]
            },
            {
              "text": "1",
              "childItems": [
                {
                  "text": "l",
                  "kind": "property"
                }
              ]
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
        "text": "a",
        "kind": "var"
      }
    ]
  },
  {
    "text": "a",
    "kind": "var",
    "childItems": [
      {
        "text": "b",
        "kind": "property"
      },
      {
        "text": "c",
        "kind": "property"
      },
      {
        "text": "d",
        "kind": "property"
      },
      {
        "text": "f",
        "kind": "property"
      },
      {
        "text": "j",
        "kind": "property"
      }
    ],
    "indent": 1
  },
  {
    "text": "d",
    "kind": "property",
    "childItems": [
      {
        "text": "e",
        "kind": "property"
      }
    ],
    "indent": 2
  },
  {
    "text": "f",
    "kind": "property",
    "childItems": [
      {
        "text": "g",
        "kind": "property"
      },
      {
        "text": "h",
        "kind": "property"
      }
    ],
    "indent": 2
  },
  {
    "text": "h",
    "kind": "property",
    "childItems": [
      {
        "text": "i",
        "kind": "property"
      }
    ],
    "indent": 3
  },
  {
    "text": "j",
    "kind": "property",
    "childItems": [
      {
        "text": "0"
      },
      {
        "text": "1"
      }
    ],
    "indent": 2
  },
  {
    "text": "0",
    "childItems": [
      {
        "text": "k",
        "kind": "property"
      }
    ],
    "indent": 3
  },
  {
    "text": "1",
    "childItems": [
      {
        "text": "l",
        "kind": "property"
      }
    ],
    "indent": 3
  }
]);
