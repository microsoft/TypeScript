/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @resolveJsonModule: true

// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completions({
    marker: "",
    exact: { name: "test.json", kind: "script", kindModifiers: ".json" },
    isNewIdentifierLocation: true,
});
