// @fullEmitPaths: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "out"
  }
}

// @Filename: /out/package.json
{ "type": "module" }

// @Filename: /src/a.ts
import { b } from "./b";

// @Filename: /src/b.ts
export const b = 0;
