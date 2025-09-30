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
        "ignoreDeprecations": "6.0",
        "paths": {
            "@ts-bug/a": ["../a"]
        }
    }
}

// @link: packages/a -> node_modules/@ts-bug/a
// @link: packages/b -> node_modules/@ts-bug/b
