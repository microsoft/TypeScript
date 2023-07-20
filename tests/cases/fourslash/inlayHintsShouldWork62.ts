/// <reference path="fourslash.ts" />

////function trace(message: string) {}
////trace(`${1}`);
////trace(``);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
