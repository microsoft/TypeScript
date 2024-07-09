/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: secret.ts
// Case: accessibility modifier inheritance
////class Secret {
////    #secret(): string {
////        return "secret";
////    }
////
////    private tell(): string {
////        return this.#secret();
////    }
////
////    protected hint(): string {
////        return "hint";
////    }
////
////    public refuse(): string {
////        return "no comments";
////    }
////}
////
////class Gossip extends Secret {
////    /* no telling secrets */
////    /*a*/
////}


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    excludes: [
        "tell",
        "#secret",
    ],
    includes: [
        {
            name: "hint",
            sortText: completion.SortText.LocationPriority,
            insertText: "protected hint(): string {\n}",
            filterText: "hint",
        },
        {
            name: "refuse",
            sortText: completion.SortText.LocationPriority,
            insertText: "public refuse(): string {\n}",
            filterText: "refuse",
        }
    ],
});