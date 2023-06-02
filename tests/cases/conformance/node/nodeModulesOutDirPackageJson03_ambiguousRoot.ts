// @fullEmitPaths: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "out"
  },
  "include": ["src"]
}

// @Filename: /out/package.json
{ "type": "module" }

// @Filename: /src/a.ts
import { b } from "./b.js";

// @Filename: /src/b.ts
export const b = 0;
export * from "../c.js";

// @Filename: /c.ts
export {};
