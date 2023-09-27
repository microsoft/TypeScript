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
////export const exp = {
////  person: getPerson()
////};

goTo.file("/code.ts");

verify.codeFix({
    description: "Add inline type assertion to 'Person'",
    index: 1,
    newFileContent:
`import { Person, getPerson } from "./person-code";
export const exp = {
  person: getPerson() as Person
};`
});
