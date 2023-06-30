/// <reference path='fourslash.ts' />

// @strict: true
////function f(a: ?number, b: string!) {}

verify.codeFixAll({
	fixId: "fixJSDocTypes_plain",
	fixAllDescription: "Change all jsdoc-style types to TypeScript",
	newFileContent: "function f(a: number | null | undefined, b: string) {}",
})
