/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** @typedef {(string | number)} NumberLike */
//// /** @typedef {(string | number | string[])} */
//// var NumberLike2;
////
//// /** @type {/*1*/NumberLike} */
//// var numberLike;

verify.navigationBar([
  {
    "text": "NumberLike",
    "kind": "type"
  },
  {
    "text": "NumberLike2",
    "kind": "type"
  },
  {
    "text": "NumberLike2",
    "kind": "var"
  },
  {
    "text": "numberLike",
    "kind": "var"
  }
]);