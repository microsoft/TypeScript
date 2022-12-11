/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*a*/export const f = () => {
////    return class C {
////        constructor(@Foo() param: any) { }
////    }
////}/*b*/
////function Foo(...args: any[]): any {}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert named export to default export",
    actionDescription: "Convert named export to default export",
    newContent:
`export default () => {
    return class C {
        constructor(@Foo() param: any) { }
    }
}
function Foo(...args: any[]): any {}`,
});
