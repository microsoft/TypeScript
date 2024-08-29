/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
//// export function foo () {
////     return Symbol();
//// }

verify.codeFixAvailable([
    { description: "Add return type 'symbol'" }
]);

verify.codeFix({
    description: "Add return type 'symbol'",
    index: 0,
    newFileContent:
`export function foo (): symbol {
    return Symbol();
}`
});
