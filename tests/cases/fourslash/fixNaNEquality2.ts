/// <reference path="fourslash.ts" />

////if (NaN === x) {}

verify.codeFix({
    index: 0,
    description: "Use `Number.isNaN(x)`.",
    newFileContent: "if (Number.isNaN(x)) {}",
});
