/// <reference path="fourslash.ts" />

// Issue #52662

// @filename: other.ts
//// export default class Other {}

// @filename: base.ts
//// import Other from "./other";
//// export class Base {
////     foo(): Other {
////         throw new Error("");
////     }
//// }

// @filename: derived.ts
//// import { Base } from "./base";
//// export class Derived extends Base {
////     /**/
//// }

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            filterText: "foo",
            insertText: "foo(): Other {\n}",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ],
})