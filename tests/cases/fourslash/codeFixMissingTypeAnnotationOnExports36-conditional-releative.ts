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
      "description": "Add annotation of type 'string'"
    },
    {
      "description": "Add satisfies and an inline type assertion with '\"A\" | \"B\"'"
    },
    {
      "description": "Add satisfies and an inline type assertion with 'typeof A | typeof B'"
    },
    {
      "description": "Add satisfies and an inline type assertion with 'string'"
    }
])
verify.codeFix({
    description: "Add satisfies and an inline type assertion with 'typeof A | typeof B'" ,
    index: 4,
    newFileContent:
`const A = "A"
const B = "B"
export const AB = (Math.random() ? A : B) satisfies typeof A | typeof B as typeof A | typeof B;`
});
