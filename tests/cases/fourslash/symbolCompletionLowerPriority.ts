/// <reference path="fourslash.ts" />

////declare const Symbol: (s: string) => symbol;
////const mySymbol = Symbol("test");
////interface TestInterface { 
////    [mySymbol]: string;
////    normalProperty: number;
////}
////const obj: TestInterface = {} as any;
////obj./*completions*/

// Test new behavior: Symbol completions should have lower priority  
verify.completions({
    marker: "completions",
    includes: [
        { name: "normalProperty", sortText: completion.SortText.LocationPriority },
        { name: "mySymbol", sortText: completion.SortText.GlobalsOrKeywords, insertText: "[mySymbol]" }
    ],
    preferences: { includeInsertTextCompletions: true }
});