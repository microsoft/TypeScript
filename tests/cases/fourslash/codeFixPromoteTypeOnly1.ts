/// <reference path="fourslash.ts" />
// @module: es2015

// https://github.com/microsoft/TypeScript/issues/55363

// @Filename: index.ts
//// import { TwistyAlgEditor, type TwistyPlayer } from "./other-file";
//// new TwistyPlayer();

// @Filename: other-file.ts
//// export class TwistyAlgEditor {}
//// export class TwistyPlayer {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Remove_type_from_import_of_0_from_1.message, "TwistyPlayer", "./other-file"],
    applyChanges: true,
    newFileContent:
`import { TwistyAlgEditor, TwistyPlayer } from "./other-file";
new TwistyPlayer();`
})