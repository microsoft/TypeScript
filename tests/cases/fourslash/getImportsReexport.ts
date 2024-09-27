///<reference path="fourslash.ts"/>

// @Filename: /first.ts
//// export function foo() {
////     return 1;
//// }
// @Filename: /index.ts
//// export { foo } from "./first";
//// function bar() {
////     return 2;
//// }
////


verify.getImports('/index.ts', ['/first.ts'])
