/// <reference path='fourslash.ts' />

// @filename: /test.ts
////export const x = 1;

// @filename: /foo.ts
////import * as test from "./test";
////
////namespace Foo {
////    export const x = 0;
////}
////
////test.f();
////Foo.f();
////f();

goTo.file("/foo.ts");
verify.codeFixAll({
    fixId: "fixMissingFunctionDeclaration",
    fixAllDescription: ts.Diagnostics.Add_all_missing_function_declarations.message,
    newFileContent: {
        "/test.ts":
`export const x = 1;

export function f() {
    throw new Error("Function not implemented.");
}
`,
        "/foo.ts":
`import * as test from "./test";

namespace Foo {
    export const x = 0;

    export function f() {
        throw new Error("Function not implemented.");
    }
}

test.f();
Foo.f();
f();

function f() {
    throw new Error("Function not implemented.");
}
`
    }
});
