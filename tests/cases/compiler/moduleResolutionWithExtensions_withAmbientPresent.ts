// @noImplicitReferences: true
// @traceResolution: true
// Allowjs is false, but this should *not* warn about the unused 'index.js'

// @Filename: /node_modules/js/index.js

// @Filename: /declarations.d.ts
declare module "js" {
    export const x = 0;
}

// @Filename: /a.ts
/// <reference path="declarations.d.ts" />
import { x } from "js";
