/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////c[|o|]nst;
////require("x");

goTo.eachRange(() => verify.not.refactorAvailable("Convert to ES6 module"));
