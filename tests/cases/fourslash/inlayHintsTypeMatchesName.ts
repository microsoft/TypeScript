/// <reference path="fourslash.ts" />

//// type Client = {};
//// function getClient(): Client { return {}; };
//// const client = getClient();

verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayVariableTypeHintsWhenTypeMatchesName: false
});
