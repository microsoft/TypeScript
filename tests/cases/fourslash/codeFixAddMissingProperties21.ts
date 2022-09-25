/// <reference path='fourslash.ts' />

// @filename: /a.ts
////export type A = { x: string };

// @filename: /b.ts
////import { A } from "./a";
////export type Foo = { x: string };
////export interface B {
////    b(a: A): Foo;
////}

// @filename: /c.ts
////import { B } from "./b";
////const b: B = {};

goTo.file("/c.ts");
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newFileContent:
`import { A } from "./a";
import { B, Foo } from "./b";
const b: B = {
    b: function(a: A): Foo {
        throw new Error("Function not implemented.");
    }
};`,
});
