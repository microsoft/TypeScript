/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: a.js
//// Thing.abc = 123
//// Thing.prototype.def = 456
//// new Thing/**/();

verify.goToDefinition("", "");
verify.noErrors();
