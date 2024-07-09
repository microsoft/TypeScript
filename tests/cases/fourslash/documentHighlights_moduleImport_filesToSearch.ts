/// <reference path="fourslash.ts" />

// @Filename: /node_modules/@types/foo/index.d.ts
////export const x: number;

// @Filename: /a.ts
////import * as foo from "foo";
////foo.[|x|];

// @Filename: /b.ts
////import { [|x|] } from "foo";

// @Filename: /c.ts
////import { x } from "foo";

const [r0, r1] = test.ranges();
verify.baselineDocumentHighlights(test.ranges(), { filesToSearch: ["/a.ts", "/b.ts"] });
