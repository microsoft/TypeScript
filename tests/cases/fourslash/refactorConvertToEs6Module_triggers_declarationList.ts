/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////c[|o|]nst;
////require("x");

goTo.eachRange(() => verify.refactorAvailable("Convert to ES6 module"));
