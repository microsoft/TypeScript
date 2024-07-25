/// <reference path="fourslash.ts" />

// @Filename: /a.ts
/////*a*/export default class A {}/*b*/

// @Filename: /b.ts
////export type A = typeof import("./a").default;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert default export to named export",
    actionDescription: "Convert default export to named export",
    newContent: {
        "/a.ts": "export class A {}",
        "/b.ts": "export type A = typeof import(\"./a\").A;"
    },
});
