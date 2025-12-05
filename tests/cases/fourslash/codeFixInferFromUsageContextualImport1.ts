/// <reference path="fourslash.ts" />

// @strict: true
// @noImplicitAny: true
// @noLib: true

// @Filename: /a.ts
////export interface User {}
////export declare function getEmail(user: User): string;

// @Filename: /b.ts
////import { getEmail } from "./a";
////
////export function f([|user|]) {
////    getEmail(user);
////}

goTo.file("/b.ts");

verify.codeFix({
  description: "Infer parameter types from usage",
  newFileContent:
`import { getEmail, User } from "./a";

export function f(user: User) {
    getEmail(user);
}`
});
