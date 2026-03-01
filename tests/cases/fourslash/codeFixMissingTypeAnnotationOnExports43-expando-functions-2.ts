
/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////const foo = () => {}
////foo/*a*/["a"] = "A";
////foo["b"] = "C"

verify.codeFix({
    description: "Add annotation of type '{ (): void; a: string; b: string; }'",
    index: 1,
    newFileContent:
`const foo: {
    (): void;
    a: string;
    b: string;
} = () => {}
foo["a"] = "A";
foo["b"] = "C"`
});
