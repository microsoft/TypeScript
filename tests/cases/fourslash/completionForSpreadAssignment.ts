/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export const foo = { bar: 'baz' };

// @Filename: /b.ts
//// const test = foo/*1*/

// @Filename: /c.ts
//// const test2 = {...foo/*2*/}

// @Filename: /d.ts
//// const test3 = [{...foo/*3*/}]

// hereby runtests --tests=completionForSpreadAssignment
verify.completions({ 
    marker: "1",
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: true, 
    preferences: { includeCompletionsForModuleExports: true } 
}, {
    marker: "2", 
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: false, 
    preferences: { includeCompletionsForModuleExports: true } 
}, {
    marker: "3", 
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: false, 
    preferences: { includeCompletionsForModuleExports: true } 
});
