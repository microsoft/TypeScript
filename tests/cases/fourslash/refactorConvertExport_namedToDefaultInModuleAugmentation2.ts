/// <reference path='fourslash.ts' />

////export {};
////declare module "foo" {
////    /*a*/export function func(): void;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert named export to default export",
    actionDescription: "Convert named export to default export",
    newContent:
`export {};
declare module "foo" {
    export default function func(): void;
}`
});
