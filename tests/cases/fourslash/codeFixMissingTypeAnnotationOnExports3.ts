/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////const a = 42;
////const b = 42;
////export class C {
////  //making sure comments are not changed
////  property =a+b; // comment should stay here
////}

verify.codeFix({
    description: "Add annotation of type 'number'",
    index: 0,
    newFileContent:
`const a = 42;
const b = 42;
export class C {
  //making sure comments are not changed
  property: number =a+b; // comment should stay here
}`,
});
