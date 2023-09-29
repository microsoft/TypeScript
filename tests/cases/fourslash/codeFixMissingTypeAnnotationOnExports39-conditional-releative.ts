/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts
////const A = "A"
////const B = "B"
////export const AB = Math.random()? A: B;
verify.codeFixAvailable([
    {
      "description": "Add annotation of type '\"A\" | \"B\"'"
    },
    {
      "description": "Add annotation of type 'typeof A | typeof B'"
    },
    {
      "description": "Add inline type assertion to '\"A\" | \"B\"'"
    },
    {
      "description": "Add inline type assertion to 'typeof A | typeof B'"
    }
])
verify.codeFix({
    description: "Add inline type assertion to 'typeof A | typeof B'" ,
    index: 3,
    newFileContent:
`const A = "A"
const B = "B"
export const AB = (Math.random() ? A : B) as typeof A | typeof B;`
});
