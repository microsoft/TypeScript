/// <reference path="fourslash.ts" />

// @strict: true
// @noImplicitAny: true
// @noLib: true

// @Filename: /types.d.ts
////declare function getEmail(user: import('./a').User, settings: import('./a').Settings): string;

// @Filename: /a.ts
////export interface User {}
////export interface Settings {}

// @Filename: /b.ts
////export function f([|user|], settings) {
////    getEmail(user, settings);
////}

goTo.file("/b.ts");

verify.codeFix({
  index: 0,
  description: "Infer parameter types from usage",
  newFileContent:
`import { User, Settings } from "./a";

export function f(user: User, settings: Settings) {
    getEmail(user, settings);
}`
});
