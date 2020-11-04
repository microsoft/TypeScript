/// <reference path="fourslash.ts" />

// @strict: true
// @noImplicitAny: true
// @noLib: true

// @Filename: /getEmail.ts
////import { User, Settings } from './a';
////export declare function getEmail(user: User, settings: Settings): string;

// @Filename: /a.ts
////export interface User {}
////export interface Settings {}

// @Filename: /b.ts
////import { getEmail } from './getEmail';
////
////export function f([|user|], settings) {
////    getEmail(user, settings);
////}

goTo.file("/b.ts");

verify.codeFix({
  index: 0,
  description: "Infer parameter types from usage",
  newFileContent:
`import { User, Settings } from './a';
import { getEmail } from './getEmail';

export function f(user: User, settings: Settings) {
    getEmail(user, settings);
}`
});
