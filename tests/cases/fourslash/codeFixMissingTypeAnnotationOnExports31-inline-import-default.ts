/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /person-code.ts
////export type Person = { x: string; }
////export function getPerson() : Person {
////  return null!
////}

// @Filename: /code.ts
////import { getPerson } from "./person-code";
////export default {
////  person: getPerson()
////};

goTo.file("/code.ts");
verify.codeFixAvailable([
  {
    "description": "Extract default export to variable"
  },
  {
    "description": "Add satisfies and an inline type assertion with 'Person'"
  },
  {
    "description": "Extract to variable and replace with 'newLocal as typeof newLocal'"
  }
])

verify.codeFix({
    description: "Add satisfies and an inline type assertion with 'Person'",
    index: 1,
    newFileContent:
`import { getPerson, Person } from "./person-code";
export default {
  person: getPerson() satisfies Person as Person
};`
});
