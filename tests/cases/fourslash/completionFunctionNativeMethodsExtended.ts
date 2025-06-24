/// <reference path='fourslash.ts'/>

//// // Test case 1: Function with custom properties should prioritize custom over native
//// interface FunctionWithCustom {
////     (): void;
////     customMethod: () => void;
////     customProp: string;
//// }
//// declare const func1: FunctionWithCustom;
//// func1./*completionFunc*/
////
//// // Test case 2: Class constructor should NOT deprioritize 'prototype' 
//// class TestClass {
////     static customStatic: string;
//// }
//// TestClass./*completionClass*/
////
//// // Test case 3: Regular function should deprioritize native methods
//// function regularFunction() {}
//// regularFunction.customProperty = "test";
//// regularFunction./*completionRegular*/

verify.completions({
    marker: "completionFunc",
    includes: [
        { name: "customMethod", sortText: "11" },  // LocationPriority (custom)
        { name: "customProp", sortText: "11" },    // LocationPriority (custom)
        { name: "apply", sortText: "111" },        // SortBelow(LocationPriority) (native)
        { name: "call", sortText: "111" },         // SortBelow(LocationPriority) (native)
        { name: "bind", sortText: "111" }          // SortBelow(LocationPriority) (native)
    ]
});

verify.completions({
    marker: "completionClass",
    includes: [
        { name: "customStatic", sortText: "10" },  // LocalDeclarationPriority (static)
        { name: "prototype", sortText: "11" }      // LocationPriority (NOT deprioritized on class)
    ]
});

verify.completions({
    marker: "completionRegular",
    includes: [
        { name: "customProperty", sortText: "11" }, // LocationPriority (custom)
        { name: "apply", sortText: "111" },         // SortBelow(LocationPriority) (native)
        { name: "call", sortText: "111" },          // SortBelow(LocationPriority) (native)
        { name: "bind", sortText: "111" }           // SortBelow(LocationPriority) (native)
    ]
});