/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import {} from "abs";

test.setTypesRegistry({
    "abs": undefined,
});

// We only give the fix for an implicit-any module, not for a missing module.
verify.not.codeFixAvailable();
