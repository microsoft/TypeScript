/// <reference path="fourslash.ts" />

// @Filename: /江南今何在/tmp.ts
//// export const foo = 1;

// @Filename: /test.ts
//// import { foo } from "./江南/*1*/今何在/tmp";

verify.quickInfoAt("1", 'module "/江南今何在/tmp"');
