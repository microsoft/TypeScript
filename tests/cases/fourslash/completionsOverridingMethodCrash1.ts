/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////declare class Component<T> {
////    setState(stateHandler: ((oldState: T, newState: T) => void)): void;
////}
////
////class SubComponent extends Component<{}> {
////    /*$*/
////}

verify.completions({
    marker: "$",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "setState",
            sortText: completion.SortText.LocationPriority,
            insertText: "setState(stateHandler: (oldState: {}, newState: {}) => void): void {\n}",
            filterText: "setState",
        }
    ]
});
