/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo(): number[] { return [42]; }
////export const c = { foo: foo() };

verify.codeFix({
    description: `Add annotation of type '{ foo: number[]; }'`,
    index: 0,
    newFileContent:
`function foo(): number[] { return [42]; }
export const c: {
    foo: number[];
} = { foo: foo() };`,
});
