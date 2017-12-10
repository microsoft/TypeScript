/// <reference path='fourslash.ts' />

// @strict: true
////function f(a: ?number, b: string!) {}

verify.codeFixAll({
	fixId: "fixJSDocTypes_plain",
	newFileContent: "function f(a: number | null, b: string) {}",
})
