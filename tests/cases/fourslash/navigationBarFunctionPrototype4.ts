/// <reference path="fourslash.ts"/>

// @Filename: foo.js

////var A; 
////A.prototype.a = function() { };
////A.b = function() { };

verify.navigationTree({
  "text": "<global>",
  "kind": "script",
  "childItems": [
    {
      "text": "A",
      "kind": "class",
      "childItems": [
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
      }
    ],
    "indent": 1
  }
]);
