/// <reference path="fourslash.ts" />

// @filename: dep.d.ts
//// export as namespace Sample;
//// export interface Foo {
////   (): void;
////   (a: string): void;
//// }
//// export const foo: Foo;

// @filename: dep.js
//// export function foo() {}

// @filename: main.ts
//// import { foo } from './dep';
//// function /**/bar() {
////     foo();
//// }

goTo.marker();
verify.baselineCallHierarchy();
