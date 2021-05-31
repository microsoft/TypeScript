/// <reference path="fourslash.ts" />

// @strict: true
// @noImplicitAny: true
// @noLib: true

// @Filename: /types.d.ts
////declare function getEmail(user: import('./a').User): string;

// @Filename: /a.ts
////export interface User {}

// @Filename: /b.ts
////export function f([|user|]) {
////    getEmail(user);
////}

goTo.file("/b.ts");

verify.codeFix({
  description: "Infer parameter types from usage",
  newFileContent:
`import { User } from "./a";

export function f(user: User) {
    getEmail(user);
}`
});
