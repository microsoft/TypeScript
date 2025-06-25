/// <reference path="fourslash.ts" />

////declare const Symbol: (s: string) => symbol;
////const mySymbol = Symbol("test");
////interface TestInterface { 
////    [mySymbol]: string;
////    normalProperty: number;
////}
////const obj: TestInterface = {} as any;
////obj./*completions*/

// Test new behavior: Symbol completions should have lower priority and better cursor positioning
verify.completions({
    marker: "completions",
    includes: [
        { name: "normalProperty", sortText: completion.SortText.LocationPriority },
        { name: "mySymbol", sortText: completion.SortText.GlobalsOrKeywords, insertText: "[mySymbol$0]", isSnippet: true } // Now with snippet cursor positioning
    ],
    preferences: { includeInsertTextCompletions: true, includeCompletionsWithSnippetText: true }
});