/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /node_modules/abs/index.js
////export default function abs() {}

// @Filename: /a.js
////import abs from [|"abs"|];
////abs;

test.setTypesRegistry({ "abs": undefined });

verify.noErrors();
goTo.file("/a.js");

verify.getSuggestionDiagnostics([]);
verify.codeFixAvailable([]);
