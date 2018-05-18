/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /project/test.json
////not read

// @Filename: /project/index.ts
////import { } from ".//**/";

verify.completionsAt("", [], { isNewIdentifierLocation: true });
