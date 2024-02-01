/// <reference path="fourslash.ts" />

//// import { type A, type a, b, B } from "foo";
//// console.log(a, b, A, B);

verify.organizeImports(
`import { type A, type a, b, B } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" }
);

edit.replaceLine(0, 'import { type A, type a, b, B } from "foo1";');
verify.organizeImports(
`import { type A, type a, b, B } from "foo1";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "first" }
);

edit.replaceLine(0, 'import { type A, type a, b, B } from "foo2";');
verify.organizeImports(
`import { b, B, type A, type a } from "foo2";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "last" }
);

edit.replaceLine(0, 'import { type A, type a, b, B } from "foo3";');
verify.organizeImports(
`import { type A, type a, b, B } from "foo3";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" }
);

edit.replaceLine(0, 'import { type A, type a, b, B } from "foo4";');
verify.organizeImports(
`import { type A, type a, b, B } from "foo4";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true }
);

edit.replaceLine(0, 'import { type A, type a, b, B } from "foo5";');
verify.organizeImports(
`import { type A, B, type a, b } from "foo5";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false }
);