/// <reference path="fourslash.ts" />

// @Filename: foo.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         foo: {
////             prop_a: boolean;
////             prop_b: string;
////             prop_c: any;
////             prop_d: { p1: string; }
////             prop_e: string | undefined;
////             prop_f: boolean | undefined | { p1: string; };
////             prop_g: { p1: string; } | undefined;
////             prop_h?: string;
////             prop_i?: boolean;
////             prop_j?: { p1: string; };
////         }
////     }
//// }
//// 
//// <foo [|prop_/**/|] />

verify.completions({
    marker: "",
    exact: [
        {
            name: "prop_a",
            isSnippet: undefined,
        },
        {
            name: "prop_b",
            isSnippet: undefined,
        },
        {
            name: "prop_c",
            isSnippet: undefined,
        },
        {
            name: "prop_d",
            isSnippet: undefined,
        },
        {
            name: "prop_e",
            isSnippet: undefined,
        },
        {
            name: "prop_f",
            isSnippet: undefined,
        },
        {
            name: "prop_g",
            isSnippet: undefined,
        },
        {
            name: "prop_h",
            isSnippet: undefined,
            sortText: completion.SortText.OptionalMember,
        },
        {
            name: "prop_i",
            isSnippet: undefined,
            sortText: completion.SortText.OptionalMember,
        },
        {
            name: "prop_j",
            isSnippet: undefined,
            sortText: completion.SortText.OptionalMember,
        }
    ],
    preferences: {
        jsxAttributeCompletionStyle: undefined,
        includeCompletionsWithSnippetText: true
    }
});