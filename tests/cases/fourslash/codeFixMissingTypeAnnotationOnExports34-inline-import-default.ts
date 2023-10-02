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
    "description": "Add inline type assertion to 'Person'"
  },
  {
    "description": "Extract to variable and replace with 'person_1 typeof person_1'"
  }
])

verify.codeFix({
    description: "Add inline type assertion to 'Person'",
    index: 1,
    newFileContent:
`import { Person, getPerson } from "./person-code";
export default {
  person: getPerson() as Person
};`
});
