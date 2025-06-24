/// <reference path='fourslash.ts'/>

//// interface CustomFunction {
////     (): void;
////     custom: string;
////     table: () => void;
//// }
//// 
//// declare const func: CustomFunction;
//// func./*completion*/

// Check that custom properties have higher priority than native function methods
verify.completions({
    marker: "completion",
    includes: [
        { name: "custom", sortText: "11" },  // LocationPriority
        { name: "table", sortText: "11" },   // LocationPriority 
        { name: "apply", sortText: "111" },  // SortBelow(LocationPriority)
        { name: "bind", sortText: "111" },   // SortBelow(LocationPriority)
        { name: "call", sortText: "111" }    // SortBelow(LocationPriority)
    ]
});