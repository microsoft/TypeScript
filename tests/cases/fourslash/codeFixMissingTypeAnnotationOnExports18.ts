/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
//// function foo() { return 42; }
//// export class A {
////     readonly a = () => foo();
//// }

verify.codeFixAvailable([
    { description: "Add return type 'number'" },
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`function foo() { return 42; }
export class A {
    readonly a = (): number => foo();
}`
});
