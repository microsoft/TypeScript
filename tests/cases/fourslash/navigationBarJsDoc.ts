/// <reference path="fourslash.ts"/>

// @Filename: foo.js
/////** @typedef {(number|string)} NumberLike */
/////** @typedef {(string|number)} */
////const x = 0;

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "NumberLike",
            "kind": "type"
        },
        {
            "text": "x",
            "kind": "const"
        },
        {
            "text": "x",
            "kind": "type"
        }
    ]
});

verify.navigationBar([
  {
    "text": "<global>",
    "kind": "script",
    "childItems": [
      {
        "text": "NumberLike",
        "kind": "type"
      },
      {
        "text": "x",
        "kind": "const"
      },
      {
        "text": "x",
        "kind": "type"
      }
    ]
  },
  {
    "text": "NumberLike",
    "kind": "type",
    "indent": 1,
  },
  {
    "text": "x",
    "kind": "type",
    "indent": 1
  }
]);
