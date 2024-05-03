/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo( ){
////    return 42;
////}
////const a = foo();
////export = a;

verify.codeFix({
    description: "Add annotation of type 'number'",
    index: 0,
    newFileContent:
`function foo( ){
    return 42;
}
const a: number = foo();
export = a;`,
});
