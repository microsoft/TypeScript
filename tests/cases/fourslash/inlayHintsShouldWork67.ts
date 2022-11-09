/// <reference path="fourslash.ts" />

//// type Client = {};
//// function getClient(): Client { return {}; };
//// const client/**/ = getClient();

const markers = test.markers();

verify.getInlayHints([
    {
        text: ': Client',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayVariableTypeHintsWhenTypeMatchesName: true
});

verify.getInlayHints([], undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayVariableTypeHintsWhenTypeMatchesName: false
});
