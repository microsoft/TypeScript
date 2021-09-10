/// <reference path="fourslash.ts" />

////abstract class Base {
////    abstract foo(param1: string, param2: boolean): Promise<void>;
////}
////
////class Sub extends Base {
////    f/*a*/    
////}


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
    },
    // exact: [

    // ],
    includes: [
        {
            name: "foo",
            isRecommended: true,
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
`foo(param1: string, param2: boolean): Promise<void> {
}`,
        }
    ],
});
