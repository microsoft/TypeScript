/// <reference path="fourslash.ts" />

//// class Class {}
//// const a = new Class();

verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true
});
