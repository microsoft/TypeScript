/// <reference path="fourslash.ts" />

// Bug #57333
// @newline: LF
// @Filename: b.ts
//// export type C = { x: number }
//// export interface ExtShape {
////     $returnPromise(id: number): Promise<C>;
////     $return(id: number): C;
//// }

// @Filename: test.ts
//// import { ExtShape } from './b';
//// abstract class ExtBase implements ExtShape {
////     public $/**/
//// }

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "$returnPromise",
            sortText: completion.SortText.LocationPriority,
            insertText: "public \\$returnPromise(id: number): Promise<C> {\n}",
            filterText: "$returnPromise",
            replacementSpan: undefined,
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ]
});

verify.applyCodeActionFromCompletion("", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "$returnPromise",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Includes imports of types referenced by '$returnPromise'",
    newFileContent:
`import { C, ExtShape } from './b';
abstract class ExtBase implements ExtShape {
    $
}`
});