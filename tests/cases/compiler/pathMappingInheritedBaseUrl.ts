// @noTypesAndSymbols: true

// @Filename: /other/tsconfig.base.json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}

// @Filename: /project/tsconfig.json
{
  "extends": "../other/tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "p1": ["./lib/p1"]
    }
  }
}

// @Filename: /other/lib/p1/index.ts
export const p1 = 0;

// @Filename: /project/index.ts
import { p1 } from "p1";
