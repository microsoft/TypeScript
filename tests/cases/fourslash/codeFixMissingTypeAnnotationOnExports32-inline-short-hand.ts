/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @Filename: /code.ts
////const x = 1;
////export default {
////  x
////};

verify.codeFix({
    description: "Add satisfies and an inline type assertion with 'number'",
    index: 1,
    newFileContent:
`const x = 1;
export default {
  x: x as number
};`
});

verify.codeFix({
  description: "Add satisfies and an inline type assertion with 'typeof x'",
  index: 2,
  newFileContent:
`const x = 1;
export default {
  x: x as typeof x
};`
});
