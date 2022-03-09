/// <reference path="fourslash.ts" />

////class Foo {
////}
////module Foo {
////    export var x: number;
////}
////Foo./**/

const exact: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = completion.functionMembersPlus([
    "prototype",
    { name: "x", text: "var Foo.x: number" },
]);
verify.completions({ marker: "", exact });

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completions({ exact });
