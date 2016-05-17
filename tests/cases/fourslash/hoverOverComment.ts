/// <reference path="fourslash.ts" />

////export function f() {}
//////foo
/////**///moo

goTo.marker();
verify.quickInfoIs("");
verify.verifyDefinitionsName("", "");
verify.typeDefinitionCountIs(0);
verify.referencesCountIs(0);
