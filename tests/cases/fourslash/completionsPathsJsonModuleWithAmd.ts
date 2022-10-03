/// <reference path="fourslash.ts" />

// @module: amd
// @resolveJsonModule: true

// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });