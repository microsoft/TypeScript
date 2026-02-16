/// <reference path='fourslash.ts'/>

// @lib: es5

// Case 1: Function with custom properties — custom properties should appear above native Function methods
////declare function myFunc(): void;
////declare namespace myFunc {
////    const customProp: string;
////    function customMethod(): void;
////}
////myFunc./*1*/

// Case 2: User-defined Function interface in a module — should NOT be deprioritized
////declare module "myModule" {
////    interface Function {
////        mySpecialMethod(): void;
////    }
////}

// Case 3: Static class members — should continue to work as before
////class MyClass {
////    static staticProp: number;
////    static staticMethod(): void {}
////}
////MyClass./*3*/

verify.completions(
    {
        marker: "1",
        exact: [
            { name: "customMethod", kind: "function", kindModifiers: "declare", sortText: completion.SortText.LocationPriority },
            { name: "customProp", kind: "const", kindModifiers: "declare", sortText: completion.SortText.LocationPriority },
            ...completion.functionMembersWithPrototype,
        ],
    },
    {
        marker: "3",
        exact: completion.functionMembersPlus([
            { name: "staticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "staticProp", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "prototype", sortText: completion.SortText.LocationPriority },
        ]),
    },
);
