/// <reference path="fourslash.ts" />

// @strict: true
// @noImplicitAny: true
// @noLib: true

// @Filename: /a.ts
////export namespace things {
////    export namespace stuff {
////        export class User<T> {}
////    }
////}
////export declare function getEmail<T>(thing: T, user: things.stuff.User<T>): string;

// @Filename: /b.ts
////import { getEmail } from "./a";
////
////export function f([|user|]) {
////    getEmail(42, user);
////}

goTo.file("/b.ts");

verify.codeFix({
  description: "Infer parameter types from usage",
  newFileContent:
`import { getEmail, things } from "./a";

export function f(user: things.stuff.User<number>) {
    getEmail(42, user);
}`
});
