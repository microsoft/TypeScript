// @filename: packages/a/index.d.ts
declare module "@ts-bug/a" {
    export type AText = {
      value: string;
    };
    export function a(text: string): AText;
  }
  
// @filename: packages/b/src/index.ts
import { a } from "@ts-bug/a";

export function b(text: string) {
  return a(text);
}
// @filename: packages/b/tsconfig.json
{
    "compilerOptions": {
        "outDir": "dist",
        "declaration": true,
        "baseUrl": ".",
        "paths": {
            "@ts-bug/a": ["../a"]
        }
    }
}

// @link: tests/cases/compiler/packages/a -> tests/cases/compiler/node_modules/@ts-bug/a
// @link: tests/cases/compiler/packages/b -> tests/cases/compiler/node_modules/@ts-bug/b
