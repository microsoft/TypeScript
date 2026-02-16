/// <reference path="../fourslash.ts"/>

// @lib: es5

////class Foo {
////}
////namespace Foo {
////    export var x: number;
////}
////Foo./**/

const exact: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "prototype", kind: "property", sortText: completion.SortText.LocationPriority },
    { name: "x", text: "var Foo.x: number", tags: [] },
    ...completion.functionMembers.map(e =>
        e.name === "arguments" ? { ...e, kind: "property", kindModifiers: "declare", tags: [] } : e),
];
verify.completions({ marker: "", exact });

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completions({ exact });
