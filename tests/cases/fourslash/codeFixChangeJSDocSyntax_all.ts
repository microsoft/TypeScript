// @strict: true
////function f(a: ?number, b: string!) {}

verify.codeFixAll({
	groupId: "fixJSDocTypes_plain",
	newFileContent: "function f(a: number | null, b: string) {}",
})
