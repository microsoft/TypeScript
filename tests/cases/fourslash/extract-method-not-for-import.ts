/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////i/**/mport _ from "./b";

// @Filename: /b.ts
////export default function f() {}

goTo.marker("");
verify.not.refactorAvailable('Extract Symbol');
