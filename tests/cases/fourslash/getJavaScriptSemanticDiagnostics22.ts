/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// function foo(...a) {}

verify.getSemanticDiagnostics(`[]`);
