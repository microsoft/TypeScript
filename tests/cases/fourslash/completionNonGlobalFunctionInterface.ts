/// <reference path='fourslash.ts'/>

// Test that user-defined Function interface in non-global scope is not treated as native
//// namespace MyNamespace {
////     interface Function {
////         customMethod(): void;
////     }
////     
////     interface MyFunction extends Function {
////         (): void;
////         userProperty: string;
////     }
////     
////     declare const func: MyFunction;
////     func./*completion*/
//// }

verify.completions({
    marker: "completion",
    includes: [
        { name: "userProperty", sortText: "11" },      // LocationPriority (custom property)
        { name: "customMethod", sortText: "11" },      // LocationPriority (not native Function)
    ]
});