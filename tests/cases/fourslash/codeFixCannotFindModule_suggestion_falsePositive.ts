/// <reference path='fourslash.ts' />

// @moduleResolution: node
// @resolveJsonModule: true
// @strict: true

// @Filename: /node_modules/foo/bar.json
////{ "a": 0 }

// @Filename: /a.ts
////import abs = require([|"foo/bar.json"|]);
////abs;

verify.noErrors();
goTo.file("/a.ts");
verify.getSuggestionDiagnostics([]);
