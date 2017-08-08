/// <reference path="fourslash.ts" />

//// [|bar/*0*/();|]

// @Filename: foo.ts
//// interface MyStatic {
////     bar(): void;
//// }
//// declare var x: MyStatic;
//// export = x;

verify.importFixAtPosition([
`import { bar } from "./foo";

bar();`
]);