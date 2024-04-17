/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
//// export default 1 + 1;

verify.codeFix({
    description: "Extract default export to variable",
    index: 0,
    newFileContent:
`const __default: number = 1 + 1;
export default __default;`
});