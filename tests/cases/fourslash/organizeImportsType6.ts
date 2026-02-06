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

edit.replaceLine(0, 'import { type a, A, b } from "foo1";');
verify.organizeImports(
`import { type a, A, b } from "foo1";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" });

edit.replaceLine(0, 'import { type a, A, b } from "foo2";');
verify.organizeImports(
`import { type a, A, b } from "foo2";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder: "inline" });

edit.replaceLine(0, 'import { type a, A, b } from "foo3";');
verify.organizeImports(
`import { A, type a, b } from "foo3";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false, organizeImportsTypeOrder: "inline" });