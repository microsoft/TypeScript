/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
