/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext"
////   }
//// }

// @Filename: /utils.ts
//// export class Element {
////     // ...
//// }
//// 
//// export abstract class Component {
////     abstract render(): Element;
//// }

// @Filename: /classes.ts
//// import { Component } from "./utils.js";
//// 
//// export class MyComponent extends Component {
////     render/**/
//// }

goTo.marker("");
verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "render",
            sortText: completion.SortText.LocationPriority,
            filterText: "render",
            isSnippet: true,
            insertText: "render(): Element {\r\n    $0\r\n}",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ]
});

goTo.file("/utils.ts");
goTo.marker("");
edit.backspace();

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "render",
            sortText: completion.SortText.LocationPriority,
            filterText: "render",
            isSnippet: true,
            insertText: "render(): Element {\r\n    $0\r\n}",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ]
});
