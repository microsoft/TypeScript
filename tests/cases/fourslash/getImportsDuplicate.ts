///<reference path="fourslash.ts"/>

// @Filename: /first.ts
//// export function foo() {
////     return 1;
//// }
//// export function bar() {
////     return 2;
//// }

// @Filename: /index.ts
//// import { foo } from "./first";
//// import { bar } from './first';
//// console.log(foo() + bar())

verify.getImports('/index.ts', ['/first.ts'])
