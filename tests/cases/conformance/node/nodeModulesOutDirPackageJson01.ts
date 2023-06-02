// @module: nodenext
// @outDir: /out
// @fullEmitPaths: true

// @Filename: /out/package.json
{ "type": "module" }

// @Filename: /src/a.ts
import { b } from "./b";

// @Filename: /src/b.ts
export const b = 0;
