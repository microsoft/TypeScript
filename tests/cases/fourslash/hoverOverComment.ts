/// <reference path="fourslash.ts" />

////export function f() {}
//////foo
/////**///moo

goTo.marker();
verify.quickInfoIs("");
verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: "" },
    { type: "getDefinitionAtPosition", markerOrRange: "" },
);
