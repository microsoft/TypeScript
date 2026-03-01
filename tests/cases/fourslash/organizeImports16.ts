/// <reference path="fourslash.ts" />

//// import { a, A, b } from "foo";
//// interface Use extends A {}
//// console.log(a, b);

verify.organizeImports(
`import { a, A, b } from "foo";
interface Use extends A {}
console.log(a, b);`);

edit.replaceLine(0, 'import { a, A, b } from "foo1";');
verify.organizeImports(
`import { a, A, b } from "foo1";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" });

edit.replaceLine(0, 'import { a, A, b } from "foo2";');
verify.organizeImports(
`import { a, A, b } from "foo2";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true });

edit.replaceLine(0, 'import { a, A, b } from "foo3";');
verify.organizeImports(
`import { A, a, b } from "foo3";
interface Use extends A {}
console.log(a, b);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false });