/// <reference path='fourslash.ts'/>

// Test prioritization of custom properties over native Function methods
//// interface CustomFunction {
////     (value: any): string;
////     custom: symbol;
////     table: (value: any) => void;
//// }
//// 
//// declare const func: CustomFunction;
//// func./*completion*/

verify.completions({
    marker: "completion",
    includes: [
        { name: "custom", sortText: "11" },    // LocationPriority (custom property)
        { name: "table", sortText: "11" },     // LocationPriority (custom method)
        { name: "apply", sortText: "111" },    // SortBelow(LocationPriority) (native)
        { name: "call", sortText: "111" },     // SortBelow(LocationPriority) (native)
        { name: "bind", sortText: "111" },     // SortBelow(LocationPriority) (native)
        { name: "length", sortText: "111" },   // SortBelow(LocationPriority) (native)
        { name: "toString", sortText: "111" }  // SortBelow(LocationPriority) (native)
    ]
});