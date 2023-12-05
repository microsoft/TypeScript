/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
// @jsx: react
//// declare namespace JSX {
////     interface IntrinsicElements {
////         div: { a: string, b: string }
////     }
//// }
//// const value = "test";
//// <div a={v/**/} />

verify.completions(
    {
        marker: "",
        isNewIdentifierLocation: false,
        preferences: {
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
            jsxAttributeCompletionStyle: "auto",
        },
        includes: {
            name: "value",
            kind: "const",
            kindModifiers: "",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
    },
);