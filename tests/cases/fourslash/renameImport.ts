/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////import * as a from "[|./a|]";
////import a2 = require("[|./a"|]);

// @Filename: /c.js
////const a = require("[|./a|]");

verify.noErrors();
goTo.eachRange(() => { verify.renameInfoFailed(); });
