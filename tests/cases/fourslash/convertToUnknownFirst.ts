/// <reference path='fourslash.ts' />

////0 as string;

verify.codeFix({
    description: "Replace '0' with '0 as unknown'",
    index: 0,
    newFileContent: "0 as unknown as string",
});
