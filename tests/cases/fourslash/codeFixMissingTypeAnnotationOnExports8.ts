/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo() {return 42;}
////export const g = function () { return foo(); };

verify.codeFixAvailable([
    { description: "Add return type 'number'" },
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`function foo() {return 42;}
export const g = function (): number { return foo(); };`,
});
