/// <reference path="fourslash.ts" />

//// import { a, type A, b } from "foo";
//// interface Use extends A {}
//// console.log(a, b);

verify.organizeImports(
`import { a, type A, b } from "foo";
interface Use extends A {}
console.log(a, b);`);

verify.organizeImports(
`import { a, type A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" });

verify.organizeImports(
`import { a, type A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true });

verify.organizeImports(
`import { type A, a, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false });