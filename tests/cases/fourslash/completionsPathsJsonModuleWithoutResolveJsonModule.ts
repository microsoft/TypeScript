/// <reference path="fourslash.ts" />

// @resolveJsonModule: false

// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
