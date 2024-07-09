/// <reference path='fourslash.ts' />

// @filename: /test.ts
////export const x = 1;

// @filename: /foo.ts
////import * as test from "./test";
////test.foo(1, "", { x: 1, y: 1 });

goTo.file("/foo.ts");
verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent: {
        "/test.ts":
`export const x = 1;

export function foo(arg0: number, arg1: string, arg2: { x: number; y: number; }) {
    throw new Error("Function not implemented.");
}
`
    }
});
