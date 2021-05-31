/// <reference path="fourslash.ts"/>

////function f() {}
////f[Symbol.iterator] = function() {}

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
          "text": "[Symbol.iterator]",
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
        "text": "[Symbol.iterator]",
        "kind": "function"
      }
    ],
    "indent": 1
  }
]);
