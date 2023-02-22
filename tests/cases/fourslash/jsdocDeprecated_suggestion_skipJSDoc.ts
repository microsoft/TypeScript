/// <reference path="fourslash.ts" />

// Although services should never actually have this option set, the harness
// allows us to pass it, enabling tests which can verify that certain info
// is not present in the tree.

// @skipJSDocParsing: true

/////** @deprecated */
////function imDeprecated() {}
////[|imDeprecated|]()

const [range] = test.ranges();
verify.getSuggestionDiagnostics([]);
