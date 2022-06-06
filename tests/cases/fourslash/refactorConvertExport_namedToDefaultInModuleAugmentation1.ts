/// <reference path='fourslash.ts' />

// @Filename: /node_modules/@types/foo/index.d.ts
////export {};
////declare module "foo" {
////    /*a*/export function foo(): void;/*b*/
////}

// @Filename: /b.ts
////import { foo } from "foo";

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert named export to default export",
    actionDescription: "Convert named export to default export",
    newContent: {
        "/node_modules/@types/foo/index.d.ts":
`export {};
declare module "foo" {
    export default function foo(): void;
}`,
        "/b.ts":
`import foo from "foo";`
    }
});
