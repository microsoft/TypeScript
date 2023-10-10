/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @Filename: /code.ts
////const x = 1;
////export default {
////  x
////};

goTo.file("/code.ts");

verify.codeFix({
    description: "Add inline type assertion to 'number'",
    index: 1,
    newFileContent:
`const x = 1;
export default {
  x: x as number
};`
});
