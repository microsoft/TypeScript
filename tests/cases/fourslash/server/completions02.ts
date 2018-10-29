/// <reference path="../fourslash.ts"/>

////class Foo {
////}
////module Foo {
////    export var x: number;
////}
////Foo./**/

const entryName = (e: FourSlashInterface.ExpectedCompletionEntry) => typeof e === "string" ? e : e.name;
const sortedFunctionMembers = completion.functionMembersWithPrototype.slice().sort((a, b) => entryName(a).localeCompare(entryName(b)));
const exact: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [...sortedFunctionMembers, { name: "x", text: "var Foo.x: number" }];
verify.completions({ marker: "", exact });

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completions({ exact });
