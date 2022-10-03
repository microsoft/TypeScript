/// <reference path='fourslash.ts' />


//// namespace Container {
////     export interface Foo {
////         bar: string;
////     }
//// }
//// const x: [|Container.Foo.bar|] = ""

verify.not.codeFixAvailable();
