/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export type X = { x: number };
////export function f(x: X): void {}

// @Filename: /b.ts
////import { f } from "./a";
/////**/f({ x: 1 });

verify.quickInfoAt("", "(alias) f(x: X): void\nimport f");
