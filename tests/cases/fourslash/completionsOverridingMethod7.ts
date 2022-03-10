/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: abstract overloads
////abstract class Base {
////    abstract M<T>(t: T): void;
////    abstract M<T>(t: T, x: number): void;
////}
////
////abstract class Derived extends Base {
////    [|abstract|] /*a*/
////}

verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[0],
            insertText:
`abstract M<T>(t: T): void;
abstract M<T>(t: T, x: number): void;`,
        },
    ],
});