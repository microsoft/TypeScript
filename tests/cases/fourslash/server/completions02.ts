/// <reference path="../fourslash.ts"/>

////class Foo {
////}
////module Foo {
////    export var x: number;
////}
////Foo./**/

const sortedFunctionMembers = completion.functionMembersWithPrototype.slice().sort((a, b) => a.name.localeCompare(b.name));
const exact: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    ...sortedFunctionMembers.map(e =>
        e.name === "arguments" ? { ...e, kind: "property", kindModifiers: "declare", tags: [] } :
        e.name === "prototype" ? { ...e, kindModifiers: undefined } : e),
    { name: "x", text: "var Foo.x: number", tags: [] },
];
verify.completions({ marker: "", exact });

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completions({ exact });
