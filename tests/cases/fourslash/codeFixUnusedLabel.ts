/// <reference path='fourslash.ts' />

// @noUnusedLocals: true

/////* a */label/* b */:/* c */while (1) {}

verify.codeFix({
    description: "Remove unused label",
    newFileContent:
`/* a */while (1) {}`,
});
