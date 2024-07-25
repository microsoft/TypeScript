//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedTemplateString.ts] ////

//// [templateStringWithEmbeddedTemplateString.ts]
var x = `123${ `456 ${ " | " } 654` }321 123${ `456 ${ " | " } 654` }321`;

//// [templateStringWithEmbeddedTemplateString.js]
var x = "123".concat("456 ".concat(" | ", " 654"), "321 123").concat("456 ".concat(" | ", " 654"), "321");
