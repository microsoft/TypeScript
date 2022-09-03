/// <reference path="fourslash.ts" />

////if (x === NaN) {}

verify.codeFix({
    index: 0,
    description: "Use `Number.isNaN(x)`.",
    newFileContent: "if (Number.isNaN(x)) {}",
});
