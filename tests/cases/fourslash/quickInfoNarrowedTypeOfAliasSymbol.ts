/// <reference path='fourslash.ts' />
// @strict: true

// @Filename: modules.ts
//// export declare const someEnv: string | undefined;

// @Filename: app.ts
//// import { someEnv } from "./modules";
//// declare function isString(v: any): v is string;
////
//// if (isString(someEnv)) {
////   someEnv/*1*/.charAt(0);
//// }

goTo.file("app.ts");
goTo.marker("1");
verify.quickInfoIs(`(alias) const someEnv: string\nimport someEnv`);
