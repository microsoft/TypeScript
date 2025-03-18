//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesWithTemplateStrings01.ts] ////

//// [stringLiteralTypesWithTemplateStrings01.ts]
let ABC: "ABC" = `ABC`;
let DE_NEWLINE_F: "DE\nF" = `DE
F`;
let G_QUOTE_HI: 'G"HI';
let JK_BACKTICK_L: "JK`L" = `JK\`L`;

//// [stringLiteralTypesWithTemplateStrings01.js]
let ABC = `ABC`;
let DE_NEWLINE_F = `DE
F`;
let G_QUOTE_HI;
let JK_BACKTICK_L = `JK\`L`;
