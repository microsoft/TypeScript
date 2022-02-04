/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// export var inModule = 1
//// [|inmodule|].toFixed()

verify.codeFix({
    description: "Change spelling to 'inModule'",
    index: 0,
    newFileContent:
`export var inModule = 1
inModule.toFixed()`,
});
