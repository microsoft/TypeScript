/// <reference path='fourslash.ts' />

////some/*undefined*/Variable;

goTo.marker("undefined");
verify.not.definitionLocationExists();
