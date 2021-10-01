/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const x = require('x');
////x.default();
////const y = require('y').default;
////y();

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import x from 'x';
x();
import y from 'y';
y();`,
});
