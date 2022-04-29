/// <reference path='fourslash.ts' />

// @Filename: /foo.ts
////declare module "foo" {
////    /*a*/export default function foo(): void;/*b*/
////}

// @Filename: /b.ts
////import foo from "foo";

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert default export to named export",
    actionDescription: "Convert default export to named export",
    newContent: {
        "/foo.ts":
`declare module "foo" {
    export function foo(): void;
}`,

        "/b.ts":
`import { foo } from "foo";`,
},
});
