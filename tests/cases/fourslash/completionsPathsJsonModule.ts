/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @resolveJsonModule: true

// @Filename: /project/node_modules/test.json
////not read

// @Filename: /project/index.ts
////import { } from "/**/";

verify.completions({
    marker: "",
    exact: { name: "test.json", kind: "script", kindModifiers: ".json" },
    isNewIdentifierLocation: true,
});
