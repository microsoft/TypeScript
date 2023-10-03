/// <reference path="fourslash.ts" />

//// import { type A, type a, b, B } from "foo";
//// console.log(a, b, A, B);

// verify.organizeImports(
// `import { B, b, type A, type a } from "foo";
// console.log(a, b, A, B);`,
//     /*mode*/ undefined,
//     { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "last" }
// );

verify.organizeImports(
`import { type A, type a, b, B } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" }
);

verify.organizeImports(
`import { type A, type a, b, B } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "first" }
);

verify.organizeImports(
`import { B, b, type A, type a } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "last" }
);

verify.organizeImports(
`import { B, b, type A, type a } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto" }
);

verify.organizeImports(
`import { B, b, type A, type a } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: true }
);

verify.organizeImports(
`import { B, b, type A, type a } from "foo";
console.log(a, b, A, B);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false }
);