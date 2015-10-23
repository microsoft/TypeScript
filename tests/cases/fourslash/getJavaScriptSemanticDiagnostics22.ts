/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// function foo(...a) {}

verify.getSemanticDiagnostics(`[]`);
