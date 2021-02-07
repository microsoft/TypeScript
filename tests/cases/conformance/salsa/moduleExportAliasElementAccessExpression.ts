// @declaration: true
// @checkJs: true
// @filename: moduleExportAliasElementAccessExpression.js
// @outdir: out

function D () { }
exports["D"] = D;
 // (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;
