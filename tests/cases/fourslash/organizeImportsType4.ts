/// <reference path="fourslash.ts" />

//// import { type a, A, b } from "foo";
//// interface Use extends A {}
//// console.log(a, b);

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`);

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" });

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true });

verify.organizeImports(
`import { A, type a, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false });