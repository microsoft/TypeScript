/// <reference path="fourslash.ts" />

// @filename: /a.ts
//// export class A {}

// @filename: /b.ts
//// export function f(a: any) {}

// @filename: /c.ts
//// import { A } from './a';
//// import { f } from './b';
////
//// f({}, new A());

goTo.file("/c.ts");

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "f"],
    index: 0,
    newFileContent: {
        "/b.ts":
`import { A } from "./a";

export function f(a: any, p0: A) {}`,
    },
});
