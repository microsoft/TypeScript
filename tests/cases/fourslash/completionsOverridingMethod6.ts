/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: modifiers
//// class Base {
////     method() {}
////     protected prop = 1;
//// }

//// class A extends Base {
////     public abstract /*a*/
//// }

//// abstract class Ab extends Base {
////     [|public abstract /*b*/|]
//// }

//// class B extends Base {
////     [|public override m/*c*/|]
//// }

//// class C extends Base {
////     [|override /*d*/|]
//// }

//// class E extends Base {
////     protected notamodifier [|override /*e*/|]
//// }

//// class f extends Base {
////     [|protected /*f*/|]
//// }

//// declare function decorator(...args: any[]): any;

//// class DecoratorBase {
////     protected foo(a: string): string;
////     protected foo(a: number): number;
////     protected foo(a: any): any {
////         return a;
////     }
//// }

//// class DecoratorSub extends DecoratorBase {
////     [|@decorator protected /*g*/|]
//// }

verify.completions(
    {
        marker: "a",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        excludes: ["method", "prop"],
    },
    {
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
                insertText: "public abstract method(): void;",
                filterText: "public abstract method",
                replacementSpan: test.ranges()[0],
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "public abstract prop: number;",
                filterText: "public abstract prop",
                replacementSpan: test.ranges()[0],
            },
        ],
    },
    {
        marker: "c",
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
                insertText: "public override method(): void {\n}",
                filterText: "public override method",
                replacementSpan: test.ranges()[1],
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "public override prop: number;",
                filterText: "public override prop",
                replacementSpan: test.ranges()[1],
            },
        ]
    },
    {
        marker: "d",
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
                insertText: "override method(): void {\n}",
                filterText: "override method",
                replacementSpan: test.ranges()[2],
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "protected override prop: number;",
                filterText: "override prop",
                replacementSpan: test.ranges()[2],
            },
        ]
    },
    {
        marker: "e",
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
                insertText: "override method(): void {\n}",
                filterText: "override method",
                replacementSpan: test.ranges()[3],
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "protected override prop: number;",
                filterText: "override prop",
                replacementSpan: test.ranges()[3],
            },
        ]
    },
    {
        marker: "f",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        excludes: ["method"],
        includes: [
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "protected prop: number;",
                filterText: "protected prop",
                replacementSpan: test.ranges()[4],
            },
        ]
    },
    {
        marker: "g",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        includes: [
            {
                name: "foo",
                sortText: completion.SortText.LocationPriority,
                insertText:
`protected foo(a: string): string;
protected foo(a: number): number;
@decorator
protected foo(a: any) {
}`,
                filterText: "@decorator protected foo",
                replacementSpan: test.ranges()[5],
            },
        ]
    },
);

