/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////var b = 1;
////function A() {}; 
////A.prototype.a = function() { };
////A.b = function() { };
////b = 2
/////* Comment */
////A.prototype.c = function() { }
////var b = 2
////A.prototype.d = function() { }

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "spans": [
    {
      "start": 0,
      "length": 174
    }
  ],
  "childItems": [
    {
      "text": "A",
      "kind": "class",
      "spans": [
        {
          "start": 11,
          "length": 122
        },
        {
          "start": 144,
          "length": 30
        }
      ],
      "nameSpan": {
        "start": 20,
        "length": 1
      },
      "childItems": [
        {
          "text": "constructor",
          "kind": "constructor",
          "spans": [
            {
              "start": 11,
              "length": 15
            }
          ]
        },
        {
          "text": "a",
          "kind": "function",
          "spans": [
            {
              "start": 45,
              "length": 14
            }
          ],
          "nameSpan": {
            "start": 41,
            "length": 1
          }
        },
        {
          "text": "b",
          "kind": "function",
          "spans": [
            {
              "start": 67,
              "length": 14
            }
          ],
          "nameSpan": {
            "start": 63,
            "length": 1
          }
        },
        {
          "text": "c",
          "kind": "function",
          "spans": [
            {
              "start": 119,
              "length": 14
            }
          ],
          "nameSpan": {
            "start": 115,
            "length": 1
          }
        },
        {
          "text": "d",
          "kind": "function",
          "spans": [
            {
              "start": 160,
              "length": 14
            }
          ],
          "nameSpan": {
            "start": 156,
            "length": 1
          }
        }
      ]
    },
    {
      "text": "b",
      "kind": "var",
      "spans": [
        {
          "start": 4,
          "length": 5
        }
      ],
      "nameSpan": {
        "start": 4,
        "length": 1
      }
    },
    {
      "text": "b",
      "kind": "var",
      "spans": [
        {
          "start": 138,
          "length": 5
        }
      ],
      "nameSpan": {
        "start": 138,
        "length": 1
      }
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
      },
      {
        "text": "b",
        "kind": "var"
      },
      {
        "text": "b",
        "kind": "var"
      }
    ]
  },
  {
    "text": "A",
    "kind": "class",
    "childItems":  [
      {
        "text": "constructor",
        "kind": "constructor"
      },
      {
        "text": "a",
        "kind": "function"
      },
      {
        "text": "b",
        "kind": "function"
      },
      {
        "text": "c",
        "kind": "function"
      },
      {
        "text": "d",
        "kind": "function"
      }
    ],
    "indent": 1
  }
]);
