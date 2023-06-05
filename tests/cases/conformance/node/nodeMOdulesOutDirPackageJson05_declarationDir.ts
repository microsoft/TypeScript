// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "declaration": true,
    "declarationDir": "out",
    "emitDeclarationOnly": true,
    "rootDir": "."
  },
  "include": ["src"]
}

// @Filename: /out/package.json
{ "type": "module" }

// @Filename: /src/a.ts
import { b } from "./b";

// @Filename: /src/b.ts
export const b = 0;
