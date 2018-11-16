/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// export = 1;

// @Filename: b.ts
//// const a: import("./a") = import("./a")

goTo.file("b.ts")
verify.codeFix({
    description: "Add missing 'typeof'",
    newFileContent: `const a: typeof import("./a") = import("./a")`
});
