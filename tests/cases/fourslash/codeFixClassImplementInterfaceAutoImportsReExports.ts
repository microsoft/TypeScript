/// <reference path='fourslash.ts' />

// @Filename: node_modules/test-module/index.d.ts
////declare namespace e {
////    interface Foo {}
////}
////export = e;

// @Filename: a.ts
////import { Foo } from "test-module";
////export interface A {
////    foo(): Foo;
////}

// @Filename: b.ts
////import { A } from "./a";
////export class B implements A {}

goTo.file("b.ts");
verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`import { Foo } from "test-module";
import { A } from "./a";
export class B implements A {
    foo(): Foo {
        throw new Error("Method not implemented.");
    }
}`
});
