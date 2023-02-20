/// <reference path="fourslash.ts" />

//// import { a, A, b } from "foo";
//// interface Use extends A {}
//// console.log(a, b);

verify.organizeImports(
`import { a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`);

verify.organizeImports(
`import { a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" });

verify.organizeImports(
`import { a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true });

verify.organizeImports(
`import { A, a, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false });