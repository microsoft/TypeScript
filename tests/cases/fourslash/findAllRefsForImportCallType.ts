/// <reference path="fourslash.ts" />

// @Filename: /app.ts
//// export function he/**/llo() {};

// @Filename: /re-export.ts
//// export type app = typeof import("./app")

// @Filename: /indirect-use.ts
//// import type { app } from "./re-export";
//// declare const app: app
//// app.hello();

verify.baselineFindAllReferences("");
