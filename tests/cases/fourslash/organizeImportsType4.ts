/// <reference path="fourslash.ts" />

//// import { type a, A, b } from "foo";
//// interface Use extends A {}
//// console.log(a, b);

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsTypeOrder: "inline" });

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" });

verify.organizeImports(
`import { type a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder: "inline" });

verify.organizeImports(
`import { A, type a, b } from "foo";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false, organizeImportsTypeOrder: "inline" });