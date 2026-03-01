/// <reference path="fourslash.ts" />

// @filename: /globals.d.ts
////declare module "*.css";

// @filename: /a.ts
////import * as foo from "/**/";

verify.baselineCompletions();
