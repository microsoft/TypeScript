//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedTemplateStringES6.ts] ////

//// [templateStringWithEmbeddedTemplateStringES6.ts]
var x = `123${ `456 ${ " | " } 654` }321 123${ `456 ${ " | " } 654` }321`;

//// [templateStringWithEmbeddedTemplateStringES6.js]
var x = `123${`456 ${" | "} 654`}321 123${`456 ${" | "} 654`}321`;
