/// <reference path="fourslash.ts" />

//// import { type a, type A, b, B } from "foo";
//// console.log(a, b, A, B);

verify.organizeImports(
`import { type a, type A, b, B } from "foo";
console.log(a, b, A, B);`);

verify.organizeImports(
`import { type a, type A, b, B } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" });

verify.organizeImports(
`import { type a, type A, b, B } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "first"}
);

verify.organizeImports(
`import { B, b, type A, type a } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "last" }
);

verify.organizeImports(
`import { type A, type a, B, b } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true });

verify.organizeImports(
`import { type A, B, type a, b } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false });