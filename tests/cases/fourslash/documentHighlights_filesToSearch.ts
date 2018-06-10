/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const [|x|] = 0;

// @Filename: /b.ts
////import { [|x|] } from "./a";

const [r0, r1] = test.ranges();
verify.documentHighlightsOf(r0, [r0], { filesToSearch: [r0.fileName] });
verify.documentHighlightsOf(r1, [r1], { filesToSearch: [r1.fileName] });
