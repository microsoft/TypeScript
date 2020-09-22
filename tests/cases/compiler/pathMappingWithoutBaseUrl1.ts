// @noTypesAndSymbols: true

// @Filename: /project/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "p1": ["./lib/p1"]
    }
  }
}

// @Filename: /project/lib/p1/index.ts
export const p1 = 0;

// @Filename: /project/index.ts
import { p1 } from "p1";
