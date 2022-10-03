/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////A.prototype.a = function() { };
////A.prototype.b = function() { };
////function A() {}

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "childItems": [
    {
      "text": "A",
      "kind": "class",
      "childItems": [
        {
          "text": "a",
          "kind": "function"
        },
        {
          "text": "b",
          "kind": "function"
        },
        {
          "text": "constructor",
          "kind": "constructor"
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
        "text": "a",
        "kind": "function"
      },
      {
        "text": "b",
        "kind": "function"
      },
      {
        "text": "constructor",
        "kind": "constructor"
      }
    ],
    "indent": 1
  }
]);
