/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// fileName: code.ts
////let p = { x: 1, y: 2}
////const a = 1, b = 10, { x, y } = p, c = 1;
////export { x, y }
////export const d = a + b + c;

verify.codeFixAll({
    fixId: "fixMissingTypeAnnotationOnExports",
    fixAllDescription: ts.Diagnostics.Add_all_missing_type_annotations.message,
    newFileContent:
`let p = { x: 1, y: 2}
const x: number = p.x;
const y: number = p.y;
const a = 1, b = 10, c = 1;
export { x, y }
export const d: number = a + b + c;`
})
