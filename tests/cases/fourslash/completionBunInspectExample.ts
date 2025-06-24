/// <reference path='fourslash.ts'/>

// Test case similar to the Bun.inspect example from the issue
//// declare namespace Bun {
////     interface InspectFunction {
////         (value: any): string;
////         custom: symbol;
////         table: (value: any) => void;
////     }
////     const inspect: InspectFunction;
//// }
//// 
//// Bun.inspect./*completion*/

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