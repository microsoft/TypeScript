//// [templateStringWhitespaceEscapes2.ts]
// <TAB>, <VT>, <FF>, <SP>, <NBSP>, <BOM>
`\u0009\u000B\u000C\u0020\u00A0\uFEFF`;

//// [templateStringWhitespaceEscapes2.js]
// <TAB>, <VT>, <FF>, <SP>, <NBSP>, <BOM>
"\t\v\f \u00A0\uFEFF";
