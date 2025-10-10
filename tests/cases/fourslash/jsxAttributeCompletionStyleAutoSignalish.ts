/// <reference path="fourslash.ts" />

// @Filename: foo.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface SignalLike<T> {
////         value: T;
////         peek(): T;
////         subscribe(fn: (value: T) => void): () => void;
////     }
////     type Signalish<T> = T | SignalLike<T>;
////     interface IntrinsicElements {
////         div: {
////             class?: Signalish<string | undefined>;
////             id?: Signalish<string | undefined>;
////             title?: Signalish<string | undefined>;
////             disabled?: Signalish<boolean | undefined>;
////             'data-testid'?: Signalish<string | undefined>;
////             role?: Signalish<string | undefined>;
////             // For comparison - pure string type should still work
////             pureString?: string;
////             // Boolean-like should not get quotes
////             booleanProp?: boolean;
////         }
////     }
//// }
////
//// <div [|prop_/**/|] />

// Test that string-like Signalish types prefer quotes over braces
verify.completions({
    marker: "",
    includes: [
        {
            name: "class",
            insertText: "class=\"$1\"",
            isSnippet: true,
            sortText: completion.SortText.OptionalMember,
        },
        {
            name: "id", 
            insertText: "id=\"$1\"",
            isSnippet: true,
            sortText: completion.SortText.OptionalMember,
        },
    ],
    preferences: {
        jsxAttributeCompletionStyle: "auto",
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithInsertText: true,
    }
});
