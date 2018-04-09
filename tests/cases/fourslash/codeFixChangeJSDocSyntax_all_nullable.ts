/// <reference path='fourslash.ts' />

// @strict: true
////function f(a: ?number, b: string!) {}

verify.codeFixAll({
	fixId: "fixJSDocTypes_nullable",
	fixAllDescription: "Change all jsdoc-style types to TypeScript (and add '| undefined' to nullable types)",
	newFileContent: "function f(a: number | null | undefined, b: string) {}",
})
