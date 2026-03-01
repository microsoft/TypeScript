/// <reference path="fourslash.ts" />

// @filename: /foo.tsx
////declare namespace JSX {
////    interface Element { }
////    interface IntrinsicElements {
////        foo: {
////            className: string;
////        }
////    }
////}
////<foo cl/**/={""} />

verify.completions({
    marker: "",
    includes: {
        name: "className",
        text: "(property) className: string",
        insertText: undefined,
        isSnippet: undefined,
    },
    preferences: {
        jsxAttributeCompletionStyle: "braces",
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithInsertText: true,
    },
})
