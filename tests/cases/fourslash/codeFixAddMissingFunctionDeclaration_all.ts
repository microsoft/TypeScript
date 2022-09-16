/// <reference path='fourslash.ts' />

// @filename: /test1.ts
////export const x = 1;

// @filename: /test2.ts
////import * as test from "./test1";
////
////namespace Foo {
////    export const x = 0;
////}
////
////interface I {
////    a: (e: any) => void;
////}
////
////test.f();
////Foo.f();
////f();
////const t1: I = { a: fn }

goTo.file("/test2.ts");
verify.codeFixAll({
    fixId: "fixMissingFunctionDeclaration",
    fixAllDescription: ts.Diagnostics.Add_all_missing_function_declarations.message,
    newFileContent: {
        "/test1.ts":
`export const x = 1;

export function f() {
    throw new Error("Function not implemented.");
}
`,
        "/test2.ts":
`import * as test from "./test1";

namespace Foo {
    export const x = 0;

    export function f() {
        throw new Error("Function not implemented.");
    }
}

interface I {
    a: (e: any) => void;
}

test.f();
Foo.f();
f();
const t1: I = { a: fn }

function f() {
    throw new Error("Function not implemented.");
}


function fn(e: any): void {
    throw new Error("Function not implemented.");
}
`
    }
});
