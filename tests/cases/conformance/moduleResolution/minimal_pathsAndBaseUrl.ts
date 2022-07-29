// @traceResolution: true
// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "minimal",
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "*": [
        "*",
        "./vendor/*",
        "./vendor/*/index.d.ts",
        "./apps/*"
      ]
    }
  }
}

// @Filename: /vendor/foo/index.d.ts
export {};

// @Filename: /apps/hello.ts
export {};

// @Filename: /foo.ts
export {};

// @Filename: /main.ts
import {} from "foo";
import {} from "foo/index.js";
import {} from "hello.ts";
import {} from "hello";
import {} from "foo.js";
