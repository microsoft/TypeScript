/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////const foo = (): void => {}
////foo.a = "A";
////foo.b = "C"

verify.codeFix({
    description: "Add annotation of type '{ (): void; a: string; b: string; }'",
    index: 0,
    newFileContent:
`const foo: {
    (): void;
    a: string;
    b: string;
} = (): void => {}
foo.a = "A";
foo.b = "C"`
});