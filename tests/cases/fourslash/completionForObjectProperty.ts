/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export const foo = { bar: 'baz' };

// @Filename: /b.ts
//// const test = foo/*1*/

// @Filename: /c.ts
//// const test2 = {...foo/*2*/}

// @Filename: /d.ts
//// const test3 = [{...foo/*3*/}]

// @Filename: /e.ts
//// const test4 = { foo/*4*/ }

// @Filename: /f.ts
//// const test5 = { foo: /*5*/ }

// @Filename: /g.ts
//// const test6 = { unrelated: foo/*6*/ }

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
}, {
    marker: "4", 
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: true, 
    preferences: { includeCompletionsForModuleExports: true } 
}, {
    marker: "5", 
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: false, 
    preferences: { includeCompletionsForModuleExports: true } 
}, {
    marker: "6", 
    includes: { name: "foo", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: false, 
    preferences: { includeCompletionsForModuleExports: true } 
});
