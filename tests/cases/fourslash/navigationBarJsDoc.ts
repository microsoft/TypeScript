/// <reference path="fourslash.ts"/>

// @Filename: foo.js
/////** @typedef {(number|string)} NumberLike */
/////** @typedef {(string|number)} */
////const x = 0;

verify.navigationBar([
  {
    "text": "NumberLike",
    "kind": "type"
  },
  {
    "text": "x",
    "kind": "type"
  },
  {
    "text": "x",
    "kind": "var"
  }
]);
