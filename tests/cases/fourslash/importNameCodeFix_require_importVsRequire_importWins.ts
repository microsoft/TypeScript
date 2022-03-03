/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: blah.js
////export default class Blah {}
////export const Named1 = 0;
////export const Named2 = 1;

// @Filename: addToExisting.js
////const { Named2 } = require('./blah')
////import { Named1 } from './blah'
////
////new Blah

// @Filename: newImport.js
////import fs from 'fs';
////const path = require('path');
////
////new Blah

// If an "add to existing" fix could be applied both to an `import`
// and to a `require` declaration, prefer the `import`.
goTo.file("addToExisting.js");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: `Update import from "./blah"`,
  newFileContent: 
`const { Named2 } = require('./blah')
import Blah, { Named1 } from './blah'

new Blah`
});

// If a file contains `import` and `require` declarations but none
// can be used for an "add to existing" fix, prefer `import` for the
// new declaration.
goTo.file("newImport.js");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: `Add import from "./blah"`,
  newFileContent: 
`import fs from 'fs';
import Blah from './blah';
const path = require('path');

new Blah`
});
