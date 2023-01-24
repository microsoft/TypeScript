/// <reference path="fourslash.ts" />

// @Filename: a.js
// @allowJs: true

//// Thing.abc = 123
//// Thing.prototype.def = 456
//// new Thing/**/();

verify.goToDefinition("", []);
verify.noErrors();