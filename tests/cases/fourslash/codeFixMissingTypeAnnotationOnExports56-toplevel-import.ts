/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /person-code.ts
////export interface Person { x: string; }
////export function getPerson() : Person {
////  return null!
////}

// @Filename: /code.ts
////import { getPerson } from "./person-code";
////export function wrapPerson() {
////  return { person: getPerson() }
////};

goTo.file("/code.ts");

verify.codeFix({
    description: "Add return type '{ person: Person; }'",
    index: 0,
    newFileContent:
`import { getPerson, Person } from "./person-code";
export function wrapPerson(): {
    person: Person;
} {
  return { person: getPerson() }
};`
});
