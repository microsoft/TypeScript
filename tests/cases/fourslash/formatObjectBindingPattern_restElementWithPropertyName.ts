/// <reference path='fourslash.ts' />

////const { ...a: b } = {};

format.document();
verify.currentFileContentIs("const { ...a: b } = {};");
