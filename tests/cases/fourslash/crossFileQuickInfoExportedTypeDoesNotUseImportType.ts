/// <reference path="fourslash.ts" />

// @Filename: b.ts
////export interface B {}
////export function foob(): {
////    x: B,
////    y: B
////} {
////    return null as any;
////}
// @Filename: a.ts
////import { foob } from "./b";
////const thing/*1*/ = foob(/*2*/);

verify.quickInfoAt("1", "const thing: {\n    x: B;\n    y: B;\n}");
verify.signatureHelp({
    marker: "2",
    text: "foob(): { x: B; y: B; }"
});
