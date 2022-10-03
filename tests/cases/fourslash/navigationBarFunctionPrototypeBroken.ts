/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////function A() {}
////A. // Started typing something here
////A.prototype.a = function() { };
////G. // Started typing something here
////A.prototype.a = function() { };

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "spans": [
    {
      "start": 0,
      "length": 151
    }
  ],
  "childItems": [
    {
      "text": "G",
      "kind": "method",
      "spans": [
        {
          "start": 84,
          "length": 66
        }
      ],
      "nameSpan": {
        "start": 84,
        "length": 1
      },
      "childItems": [
        {
          "text": "A",
          "kind": "method",
          "spans": [
            {
              "start": 84,
              "length": 66
            }
          ],
          "nameSpan": {
            "start": 120,
            "length": 1
          },
          "childItems": [
            {
              "text": "a",
              "kind": "function",
              "spans": [
                {
                  "start": 136,
                  "length": 14
                }
              ],
              "nameSpan": {
                "start": 132,
                "length": 1
              }
            }
          ]
        }
      ]
    },
    {
      "text": "A",
      "kind": "class",
      "spans": [
        {
          "start": 0,
          "length": 82
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
          "text": "A",
          "kind": "method",
          "spans": [
            {
              "start": 16,
              "length": 66
            }
          ],
          "nameSpan": {
            "start": 52,
            "length": 1
          },
          "childItems": [
            {
              "text": "a",
              "kind": "function",
              "spans": [
                {
                  "start": 68,
                  "length": 14
                }
              ],
              "nameSpan": {
                "start": 64,
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
        "text": "G",
        "kind": "method"
      },
      {
        "text": "A",
        "kind": "class"
      }
    ]
  },
  {
    "text": "G",
    "kind": "method",
    "childItems": [
      {
        "text": "A",
        "kind": "method"
      }
    ],
    "indent": 1
  },
  {
    "text": "A",
    "kind": "method",
    "childItems": [
      {
        "text": "a",
        "kind": "function"
      }
    ],
    "indent": 2
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
        "text": "A",
        "kind": "method"
      }
    ],
    "indent": 1
  },
  {
    "text": "A",
    "kind": "method",
    "childItems": [
      {
        "text": "a",
        "kind": "function"
      }
    ],
    "indent": 2
  },
]);
