/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @resolveJsonModule: true

// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completions({ marker: "", exact: "test.json", isNewIdentifierLocation: true });
