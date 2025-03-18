//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesWithTemplateStrings02.ts] ////

//// [stringLiteralTypesWithTemplateStrings02.ts]
let abc: "AB\r\nC" = `AB
C`;
let de_NEWLINE_f: "DE\nF" = `DE${"\n"}F`;

//// [stringLiteralTypesWithTemplateStrings02.js]
let abc = `AB
C`;
let de_NEWLINE_f = `DE${"\n"}F`;
