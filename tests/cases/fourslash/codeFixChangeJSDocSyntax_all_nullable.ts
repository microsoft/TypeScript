// @strict: true
////function f(a: ?number, b: string!) {}

verify.codeFixAll({
	groupId: "fixJSDocTypes_nullable",
	newFileContent: "function f(a: number | null | undefined, b: string) {}",
})
