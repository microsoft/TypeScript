/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: modifier inheritance/deduplication
////class A {
////    public method(): number {
////        return 0;
////    }
////}
////
////abstract class B extends A {
////    [|public abstract|] /*b*/
////}
////
////class C extends A {
////    [|public override m|]/*a*/
////}
////
////interface D {
////    fun(a: number): number;
////    fun(a: undefined, b: string): number;
////}
////
////class E implements D {
////    [|public f|]/*c*/
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
            name: "method",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[1],
            insertText: "public override method(): number {\n}",
        },
    ],
});

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "method",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[0],
            insertText: "public abstract method(): number;",
        },
    ],
});

verify.completions({
    marker: "c",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "fun",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[2],
            insertText:
`public fun(a: number): number;
public fun(a: undefined, b: string): number;
public fun(a: unknown, b?: unknown): number {
}`,
        },
    ],
});