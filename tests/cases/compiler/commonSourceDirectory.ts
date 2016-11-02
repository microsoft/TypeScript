// Test that importing a file from `node_modules` does not affect calculation of the common source directory.
// @noImplicitReferences: true
// @moduleResolution: node
// @fullEmitPaths: true

// @filename: /node_modules/foo/index.ts
export const x = 0;

// @filename: /app/index.ts
import { x } from "foo";
x + 1;

// @filename: /app/tsconfig.json
{
    "compilerOptions": {
        "outDir": "bin"
    }
}
