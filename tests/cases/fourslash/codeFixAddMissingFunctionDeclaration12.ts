/// <reference path='fourslash.ts' />

// @filename: /test.ts
////export const x = 1;

// @filename: /foo.ts
////import * as test from "./test";
////test.foo();
////test.foo();
////test.foo();

goTo.file("/foo.ts");
verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    applyChanges: true,
    newFileContent: {
        "/test.ts":
`export const x = 1;

export function foo() {
    throw new Error("Function not implemented.");
}
`
    }
});

verify.not.codeFixAvailable();
