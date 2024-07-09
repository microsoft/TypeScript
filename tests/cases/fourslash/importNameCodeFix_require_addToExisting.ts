/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: blah.js
////export default class Blah {}
////export const Named1 = 0;
////export const Named2 = 1;

// @Filename: index.js
////var path = require('path')
////  , { promisify } = require('util')
////  , { Named1 } = require('./blah')
////
////new Blah

goTo.file("index.js");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: `Update import from "./blah"`,
  newFileContent: 
`var path = require('path')
  , { promisify } = require('util')
  , { Named1, default: Blah } = require('./blah')

new Blah`
});
