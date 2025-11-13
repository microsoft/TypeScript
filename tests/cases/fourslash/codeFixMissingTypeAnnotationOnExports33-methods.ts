/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts
////export class Foo {
////  m() {
////  }
////}

verify.codeFixAvailable([
  {
    "description": "Add return type 'void'"
  },
])

verify.codeFix({
    description: "Add return type 'void'",
    index: 0,
    newFileContent:
`export class Foo {
  m(): void {
  }
}`
});
