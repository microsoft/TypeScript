/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @resolveJsonModule: true

// @Filename: /project/node_modules/test.json
////not read

// @Filename: /project/index.ts
////import { } from "/**/";

verify.completionsAt("", ["test.json"], { isNewIdentifierLocation: true });