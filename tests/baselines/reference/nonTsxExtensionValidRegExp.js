//// [tests/cases/conformance/jsx/nonTsxExtensionValidRegExp.ts] ////

//// [nonTsxExtensionValidRegExp.ts]
declare const div: any, foo: any;
type div = {};

// This is valid: <div>foo (less than) /div>/
const a = <div>foo</div>/;


//// [nonTsxExtensionValidRegExp.js]
// This is valid: <div>foo (less than) /div>/
var a = foo < /div>/;
