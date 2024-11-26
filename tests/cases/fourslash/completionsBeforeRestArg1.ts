/// <reference path="fourslash.ts" />

// @target: esnext
// @lib: esnext

//// const layers = Object.assign({}, /*1*/...[]);

verify.completions({
    marker: "1",
    includes: completion.globals,
    isNewIdentifierLocation: true,
});
