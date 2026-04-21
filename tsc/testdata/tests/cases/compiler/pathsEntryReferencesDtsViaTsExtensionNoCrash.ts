// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "some-path": ["./some-path/index.ts"]
    }
  },
  "files": ["./named-import.ts"]
}

// @filename: some-path/index.d.ts
export declare const blah: 1;

// @filename: named-import.ts
import { blah } from "some-path";

export const value = blah;
