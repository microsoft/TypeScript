/// <reference path="fourslash.ts" />

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


// format.setFormatOptions({
//     newLineCharacter: "\n",
// });
// format.setOption("newline", "\n");

verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    excludes: [
        "tell",
        "#secret",
    ],
    includes: [
        {
            name: "hint",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "protected hint(): string {\r\n}\r\n",
        },
        {
            name: "refuse",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "public refuse(): string {\r\n}\r\n",
        }
    ],
});