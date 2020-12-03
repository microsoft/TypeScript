/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////function A() {}
////A.B = function () {  } 
////A.B.prototype.d = function () {  }  
////Object.defineProperty(A.B.prototype, "x", {
////    get() {}
////})
////A.prototype.D = function () {  } 
////A.prototype.D.prototype.d = function () {  } 


verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "spans": [
    {
      "start": 0,
      "length": 216
    }
  ],
  "childItems": [
    {
      "text": "A",
      "kind": "class",
      "spans": [
        {
          "start": 0,
          "length": 215
        }
      ],
      "nameSpan": {
        "start": 9,
        "length": 1
      },
      "childItems": [
        {
          "text": "constructor",
          "kind": "constructor",
          "spans": [
            {
              "start": 0,
              "length": 15
            }
          ]
        },
        {
          "text": "B",
          "kind": "class",
          "spans": [
            {
              "start": 22,
              "length": 114
            }
          ],
          "nameSpan": {
            "start": 18,
            "length": 1
          },
          "childItems": [
            {
              "text": "constructor",
              "kind": "constructor",
              "spans": [
                {
                  "start": 22,
                  "length": 16
                }
              ]
            },
            {
              "text": "d",
              "kind": "function",
              "spans": [
                {
                  "start": 58,
                  "length": 16
                }
              ],
              "nameSpan": {
                "start": 54,
                "length": 1
              }
            },
            {
              "text": "x",
              "spans": [
                {
                  "start": 77,
                  "length": 59
                }
              ],
              "nameSpan": {
                "start": 114,
                "length": 3
              },
              "childItems": [
                {
                  "text": "get",
                  "kind": "method",
                  "spans": [
                    {
                      "start": 125,
                      "length": 8
                    }
                  ],
                  "nameSpan": {
                    "start": 125,
                    "length": 3
                  }
                }
              ]
            }
          ]
        },
        {
          "text": "D",
          "kind": "class",
          "spans": [
            {
              "start": 153,
              "length": 62
            }
          ],
          "nameSpan": {
            "start": 149,
            "length": 1
          },
          "childItems": [
            {
              "text": "constructor",
              "kind": "constructor",
              "spans": [
                {
                  "start": 153,
                  "length": 16
                }
              ]
            },
            {
              "text": "d",
              "kind": "function",
              "spans": [
                {
                  "start": 199,
                  "length": 16
                }
              ],
              "nameSpan": {
                "start": 195,
                "length": 1
              }
            }
          ]
        }
      ]
    }
  ]
}, { checkSpans: true });

verify.navigationBar([
  {
    "text": "<global>",
    "kind": "script",
    "childItems": [
      {
        "text": "A",
        "kind": "class"
      }
    ]
  },
  {
    "text": "A",
    "kind": "class",
    "childItems": [
      {
        "text": "constructor",
        "kind": "constructor"
      },
      {
        "text": "B",
        "kind": "class"
      },
      {
        "text": "D",
        "kind": "class"
      }
    ],
    "indent": 1
  },
  {
    "text": "B",
    "kind": "class",
    "childItems": [
      {
        "text": "constructor",
        "kind": "constructor"
      },
      {
        "text": "d",
        "kind": "function"
      },
      {
        "text": "x"
      }
    ],
    "indent": 2
  },
  {
    "text": "x",
    "childItems": [
      {
        "text": "get",
        "kind": "method"
      }
    ],
    "indent": 3
  },
  {
    "text": "D",
    "kind": "class",
    "childItems": [
      {
        "text": "constructor",
        "kind": "constructor"
      },
      {
        "text": "d",
        "kind": "function"
      }
    ],
    "indent": 2
  }
]);
