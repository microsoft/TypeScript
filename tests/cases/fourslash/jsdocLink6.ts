/// <reference path='fourslash.ts' />

// @filename: /a.ts
////export default function A() { }
////export function B() { };

// @Filename: /b.ts
////import A, { B } from "./a";

/////**
//// * {@link A}
//// * {@link B}
//// */
////export default function /**/f() { }

verify.baselineQuickInfo();
