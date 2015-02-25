//// [unicodeExtendedEscapesInTemplates16_ES5.ts]

var x = `\u{ABCD}\u{EF12}\u{3456}\u{7890}`;


//// [unicodeExtendedEscapesInTemplates16_ES5.js]
var x = "{ABCD}{EF12}{3456}{78\u00390}";
