/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const [|x|] = 0;

// @Filename: /b.ts
////import { [|x|] } from "./a";

verify.baselineDocumentHighlights();
