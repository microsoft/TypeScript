/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////const a = 42;
////const b = 42;
////export class C {
////  get property() { return a + b; }
////}

verify.codeFixAvailable([
    { description: "Add return type 'number'" }
]);

verify.codeFix({
    description: "Add return type 'number'",
    index: 0,
    newFileContent:
`const a = 42;
const b = 42;
export class C {
  get property(): number { return a + b; }
}`,
});
