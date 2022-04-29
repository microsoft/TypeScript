/// <reference path='fourslash.ts' />

////for ({ x } of [{ x: 0 }]) { }

verify.codeFix({
    description: "Add 'const' to unresolved variable",
    newFileContent: "for (const { x } of [{ x: 0 }]) { }"
});
