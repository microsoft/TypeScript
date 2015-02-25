//// [unicodeExtendedEscapesInTemplates15_ES5.ts]

var x = `\u{abcd}\u{ef12}\u{3456}\u{7890}`;


//// [unicodeExtendedEscapesInTemplates15_ES5.js]
var x = "{abcd}{ef12}{3456}{78\u00390}";
