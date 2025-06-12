/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// export function waitUnknown(ms: number) {
////     return new Promise(() => {});
//// }

verify.codeFix({
    description: ts.Diagnostics.Add_return_type_0.message,
    index: 0,
    newFileContent:
`export function waitUnknown(ms: number): Promise<unknown> {
    return new Promise(() => {});
}`
});