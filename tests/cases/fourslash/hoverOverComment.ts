/// <reference path="fourslash.ts" />

////export function f() {}
//////foo
/////**///moo

goTo.marker();
verify.quickInfoIs("");
verify.goToDefinitionIs([]);
verify.noReferences();
