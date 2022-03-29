/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////export interface IFoo {
////    bar(x: number): void;
////}

// @Filename: b.ts
////import { IFoo } from "./a";
////export interface IBar {
////    foo(f: IFoo): void;
////}

// @Filename: c.ts
////import { IBar } from "./b";
////const obj: IBar = {
////    /*a*/
////}

verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "foo"),
            insertText: undefined,
        },
        {
            name: "foo",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "foo")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "foo(f: IFoo): void {\n},",
            hasAction: true,
            labelDetails: {
                detail: "(f: IFoo): void",
            },
        },
    ],
});

verify.applyCodeActionFromCompletion("a", {
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    name: "foo",
    source: completion.CompletionSource.ObjectLiteralMethodSnippet,
    description: "Includes imports of types referenced by 'foo'",
    newFileContent:
`import { IFoo } from "./a";
import { IBar } from "./b";
const obj: IBar = {
    
}`
});