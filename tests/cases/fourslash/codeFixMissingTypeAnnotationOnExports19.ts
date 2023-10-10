/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// export class A {
////     readonly a = function foo() {return 42;}
//// }

verify.codeFixAvailable([
    { description: "Add return type 'number'" },
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`export class A {
    readonly a = function foo(): number {return 42;}
}`
});
