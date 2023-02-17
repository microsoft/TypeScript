/// <reference path="fourslash.ts" />

////function a(b = true, c: string = "Default value", { d = {}, c } = { d: { e: [1, 3, 4] }, c: 5 }, [foo]=[5]) {}

////a(/*1*/)

verify.baselineSignatureHelp();
