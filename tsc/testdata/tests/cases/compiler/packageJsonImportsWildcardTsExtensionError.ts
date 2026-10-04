// @noEmit: true
// @noTypesAndSymbols: true
// @module: nodenext
// @moduleResolution: nodenext
// Test verifies that when a module specifier contains ".ts" that gets matched by a
// wildcard pattern, resolvedUsingTsExtension is correctly set to true.
// Example: import "#/foo.ts.omg" with pattern "#/*.omg": "./src/*"
// The * matches "foo.ts", and when expanded becomes "./src/foo.ts"
// Since the wildcard matched ".ts" from the specifier, an error should be reported.

// @filename: src/foo.ts
export function hello() {
    return "world";
}

// @filename: src/index.ts
import { hello } from "#/foo.ts.omg";

hello();

// @filename: package.json
{
    "type": "module",
    "imports": {
        "#/*.omg": "./src/*"
    }
}

// @filename: tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
